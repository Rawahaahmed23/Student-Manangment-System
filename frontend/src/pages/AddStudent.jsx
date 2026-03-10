import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, User, X, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ─── Full Page Loader ───────────────────────────────────────────────────────
const FullPageLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
    <p className="text-gray-600 text-sm font-medium">Saving student data...</p>
  </div>
);

// ─── Main Form ──────────────────────────────────────────────────────────────
const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    GrNumber: "",
    StudentName: "",
    FatherName: "",
    Class: "",
    Gender: "Male",
    DateOfBirth: "",
    DateOfAdmission: "",
    MonthlyFee: "",
    FeeStatus: "",
    LastFeeUpdate: "",
    profileImage: null,
  });

  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) updateField("profileImage", file);
  };

  const removeImage = () => {
    updateField("profileImage", null);
  };

  const handleReset = () => {
    setFormData({
      GrNumber: "",
      StudentName: "",
      FatherName: "",
      Class: "",
      Gender: "Male",
      DateOfBirth: "",
      DateOfAdmission: "",
      MonthlyFee: "",
      FeeStatus: "",
      LastFeeUpdate: "",
      profileImage: null,
    });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.GrNumber || !formData.StudentName) {
      toast.error("GrNumber Must me required.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = null;
      let publicId = null;

      // Step 1: Image Cloudinary pe upload karo
      if (formData.profileImage) {
        const fd = new FormData();
        fd.append("file", formData.profileImage);
        fd.append("upload_preset", "rawaha");
        fd.append("cloud_name", "dtx7n84vi");
        fd.append("folder", "students");

        const imgRes = await fetch("https://api.cloudinary.com/v1_1/dtx7n84vi/image/upload", {
          method: "POST",
          body: fd,
        });

        if (!imgRes.ok) {
          throw new Error("Image upload failed. Please try again.");
        }

        const imgData = await imgRes.json();
        imageUrl = imgData.secure_url;
        publicId = imgData.public_id;
      }

      // Step 2: Baqi data JSON mein bhejo
      const response = await fetch("http://localhost:5000/Student/add_Student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          profileImage: { url: imageUrl, public_id: publicId },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Student add sucessful");
        handleReset();
      } else {
        // Backend se message + extraDetails dono combine karke show karo
        const errMsg = [data?.message, data?.extraDetails].filter(Boolean).join(" — ");
        throw new Error(errMsg || "Server error. Dobara try karein.");
      }
    } catch (error) {
      toast.error(error.message || "Kuch masla aaya. Dobara try karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* React Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      {/* Full Page Loader */}
      {loading && <FullPageLoader />}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Add New Student</h1>
                <p className="text-sm text-gray-500">Fill in the student information below</p>
              </div>
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-none border-gray-300 hover:bg-gray-50">
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={loading}
                  className="flex-1 sm:flex-none border-gray-300 hover:bg-gray-50"
                >
                  Reset
                </Button>
                <Button
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </div>
          </div>

          <Card className="border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                <CardTitle className="text-lg font-semibold text-gray-900">Add Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Profile Picture */}
                <div className="lg:col-span-4">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                        {formData.profileImage ? (
                          <img
                            src={URL.createObjectURL(formData.profileImage)}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300" />
                        )}
                      </div>
                      {formData.profileImage && (
                        <button
                          onClick={removeImage}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <label className="mt-4 sm:mt-6 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <div className="px-4 py-2 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Photo
                      </div>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF (max. 2MB)</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="lg:col-span-8">
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-1.5 block">G.R No</Label>
                        <Input
                          placeholder="Enter G.R Number"
                          value={formData.GrNumber}
                          onChange={(e) => updateField("GrNumber", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Student Name</Label>
                        <Input
                          placeholder="Enter Student Name"
                          value={formData.StudentName}
                          onChange={(e) => updateField("StudentName", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Father Name</Label>
                        <Input
                          placeholder="Enter Father Name"
                          value={formData.FatherName}
                          onChange={(e) => updateField("FatherName", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Class</Label>
                        <Input
                          placeholder="Enter Class"
                          value={formData.Class}
                          onChange={(e) => updateField("Class", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Gender</Label>
                      <RadioGroup
                        value={formData.Gender}
                        onValueChange={(val) => updateField("Gender", val)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Male" id="male" />
                          <label htmlFor="male" className="text-sm font-medium cursor-pointer">Male</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Female" id="female" />
                          <label htmlFor="female" className="text-sm font-medium cursor-pointer">Female</label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Date of Birth</Label>
                        <Input
                          type="date"
                          value={formData.DateOfBirth}
                          onChange={(e) => updateField("DateOfBirth", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Date of Admission</Label>
                        <Input
                          type="date"
                          value={formData.DateOfAdmission}
                          onChange={(e) => updateField("DateOfAdmission", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Monthly Fee</Label>
                      <Input
                        type="number"
                        placeholder="Enter Monthly Fee"
                        value={formData.MonthlyFee}
                        onChange={(e) => updateField("MonthlyFee", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StudentRegistrationForm;