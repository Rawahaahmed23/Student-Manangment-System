import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, User, X, Loader2, ArrowLeft, GraduationCap } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useStudent } from "@/Store/StudentData";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const FullPageLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
    <p className="text-gray-600 text-sm font-medium">Updating student data...</p>
  </div>
);

const EditStudent = () => {
  const { students } = useStudent();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

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
    imageUrl: "",
  });

  useEffect(() => {
    if (students && id) {
      const student = Array.isArray(students)
        ? students.find((s) => s._id === id)
        : students;

      if (student) {
        setFormData({
          GrNumber: student.GrNumber || "",
          StudentName: student.StudentName || "",
          FatherName: student.FatherName || "",
          Class: student.Class || "",
          Gender: student.Gender || "Male",
          DateOfBirth: student.DateOfBirth?.slice(0, 10) || "",
          DateOfAdmission: student.DateOfAdmission?.slice(0, 10) || "",
          MonthlyFee: student.MonthlyFee || "",
          FeeStatus: student.FeeStatus || "",
          LastFeeUpdate: student.LastFeeUpdate || "",
          profileImage: null,
          imageUrl: student.profileImage?.url || "",
        });
      }
    }
  }, [students, id]);

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) updateField("profileImage", file);
  };

  const removeImage = () => {
    updateField("profileImage", null);
    updateField("imageUrl", "");
  };

  const handleSubmit = async () => {
    if (!formData.GrNumber || !formData.StudentName) {
      toast.error("GR Number aur Student Name required hain");
      return;
    }

    setLoading(true);

    try {
      const existingStudent = Array.isArray(students)
        ? students.find((s) => s._id === id)
        : students;

      let imageUrl = formData.imageUrl;
      let publicId = existingStudent?.profileImage?.public_id;

      if (formData.profileImage) {
        const fd = new FormData();
        fd.append("file", formData.profileImage);
        fd.append("upload_preset", "rawaha");
        fd.append("cloud_name", "dtx7n84vi");
        fd.append("folder", "students");

        const imgRes = await fetch(
          "https://api.cloudinary.com/v1_1/dtx7n84vi/image/upload",
          { method: "POST", body: fd }
        );
        const imgData = await imgRes.json();
        imageUrl = imgData.secure_url;
        publicId = imgData.public_id;
      }

      const response = await fetch(`http://localhost:5000/Student/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          profileImage: { url: imageUrl, public_id: publicId },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Student Updated Successfully");
        setTimeout(() => navigate("/addstudent"), 1500);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const previewSrc = formData.profileImage
    ? URL.createObjectURL(formData.profileImage)
    : formData.imageUrl || null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      {loading && <FullPageLoader />}

      <div className="min-h-screen bg-slate-50">

        {/* ── Top Bar ── */}
        <div className="bg-white border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-none">Edit Student</h1>
              <p className="text-xs text-slate-400 mt-0.5">Update student information</p>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-4">

          {/* ── Profile Image Card ── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Profile Photo
            </p>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                  {previewSrc ? (
                    <img src={previewSrc} className="w-full h-full object-cover" alt="preview" />
                  ) : (
                    <User className="w-10 h-10 text-slate-300" />
                  )}
                </div>
                {previewSrc && (
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-sm transition-colors"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Upload */}
              <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
                <p className="text-sm font-medium text-slate-700">
                  {formData.StudentName || "Student Name"}
                </p>
                <p className="text-xs text-slate-400">
                  JPG, PNG up to 5MB
                </p>
                <label className="cursor-pointer mt-1">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium transition-colors">
                    <Upload size={13} />
                    Upload Photo
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* ── Form Card ── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Student Details
            </p>

            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">GR Number</Label>
                <Input
                  placeholder="GR Number"
                  value={formData.GrNumber}
                  onChange={(e) => updateField("GrNumber", e.target.value)}
                  className="rounded-xl border-slate-200 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Class</Label>
                <Input
                  placeholder="Class"
                  value={formData.Class}
                  onChange={(e) => updateField("Class", e.target.value)}
                  className="rounded-xl border-slate-200 text-sm"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Student Name</Label>
                <Input
                  placeholder="Student Name"
                  value={formData.StudentName}
                  onChange={(e) => updateField("StudentName", e.target.value)}
                  className="rounded-xl border-slate-200 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Father Name</Label>
                <Input
                  placeholder="Father Name"
                  value={formData.FatherName}
                  onChange={(e) => updateField("FatherName", e.target.value)}
                  className="rounded-xl border-slate-200 text-sm"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-500">Gender</Label>
              <RadioGroup
                value={formData.Gender}
                onValueChange={(val) => updateField("Gender", val)}
                className="flex gap-6"
              >
                {["Male", "Female"].map((g) => (
                  <div key={g} className="flex items-center gap-2">
                    <RadioGroupItem value={g} id={g} />
                    <Label htmlFor={g} className="text-sm cursor-pointer">{g}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Row 3 — Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.DateOfBirth}
                  onChange={(e) => updateField("DateOfBirth", e.target.value)}
                  className="rounded-xl border-slate-200 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Date of Admission</Label>
                <Input
                  type="date"
                  value={formData.DateOfAdmission}
                  onChange={(e) => updateField("DateOfAdmission", e.target.value)}
                  className="rounded-xl border-slate-200 text-sm"
                />
              </div>
            </div>

            {/* Row 4 — Fee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Monthly Fee</Label>
                <Input
                  type="number"
                  placeholder="Monthly Fee"
                  value={formData.MonthlyFee}
                  onChange={(e) => updateField("MonthlyFee", e.target.value)}
                  className="rounded-xl border-slate-200 text-sm"
                />
              </div>
            </div>
          </div>

          {/* ── Submit ── */}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-xl py-5 text-sm font-medium transition-colors"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Updating...
              </span>
            ) : (
              "Update Student"
            )}
          </Button>

        </div>
      </div>
    </>
  );
};

export default EditStudent;