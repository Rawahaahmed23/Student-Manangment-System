import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useStudent } from "@/Store/StudentData";
import "react-toastify/dist/ReactToastify.css";

const FullPageLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
    <p className="text-gray-600 text-sm font-medium">Saving student data...</p>
  </div>
);

const StudentRegistrationForm = () => {
  const { getStudents } = useStudent();
  const [formData, setFormData] = useState({
    GrNumber: "",
    StudentName: "",
    FatherName: "",
    Class: "",
    Gender: "Male",
    DateOfBirth: "",
    DateOfAdmission: "",
    MonthlyFee: "",
    PhoneNumber: "",       // ── NEW
    WhatsAppNumber: "",    // ── NEW
  });

  const [loading, setLoading] = useState(false);

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

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
      PhoneNumber: "",      // ── NEW
      WhatsAppNumber: "",   // ── NEW
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://student-manangment-system.onrender.com/Student/add_Student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data?.message || "Student added successfully!");
        await getStudents();
        handleReset();
      } else {
        toast.error(data?.extraDetails || data?.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <FullPageLoader />}
      <div className="min-h-screen p-3 sm:p-6 lg:p-8 mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Add New Student</h1>
                <p className="text-sm text-gray-500">Fill in the student information below</p>
              </div>
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-none border-gray-300 hover:bg-gray-50">Cancel</Button>
                <Button variant="outline" onClick={handleReset} disabled={loading} className="flex-1 sm:flex-none border-gray-300 hover:bg-gray-50">Reset</Button>
                <Button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60" onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                    </span>
                  ) : "Save"}
                </Button>
              </div>
            </div>
          </div>

          <Card className="border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 block">G.R No <span className="text-red-500">*</span></Label>
                    <Input placeholder="Enter G.R Number" value={formData.GrNumber} onChange={(e) => updateField("GrNumber", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Student Name <span className="text-red-500">*</span></Label>
                    <Input placeholder="Enter Student Name" value={formData.StudentName} onChange={(e) => updateField("StudentName", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Father Name <span className="text-red-500">*</span></Label>
                    <Input placeholder="Enter Father Name" value={formData.FatherName} onChange={(e) => updateField("FatherName", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Class <span className="text-red-500">*</span></Label>
                    <select
                      value={formData.Class}
                      onChange={(e) => updateField("Class", e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Class</option>
                      <option value="Reception">Reception</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={`Class ${n}`}>Class {n}</option>
                      ))}
                      <option value="Hifz">Hifz</option>
                      <option value="Nazra">Nazra</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Gender</Label>
                  <RadioGroup value={formData.Gender} onValueChange={(val) => updateField("Gender", val)}>
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" />
                        <label htmlFor="male" className="text-sm font-medium cursor-pointer">Male</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" />
                        <label htmlFor="female" className="text-sm font-medium cursor-pointer">Female</label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Date of Birth <span className="text-red-500">*</span></Label>
                    <Input type="date" value={formData.DateOfBirth} onChange={(e) => updateField("DateOfBirth", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Date of Admission <span className="text-red-500">*</span></Label>
                    <Input type="date" value={formData.DateOfAdmission} onChange={(e) => updateField("DateOfAdmission", e.target.value)} />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Monthly Fee <span className="text-red-500">*</span></Label>
                  <Input type="number" placeholder="Enter Monthly Fee" value={formData.MonthlyFee} onChange={(e) => updateField("MonthlyFee", e.target.value)} />
                </div>

         
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</Label>
                    <Input
                      type="tel"
                      placeholder="e.g. 0300-1234567"
                      value={formData.PhoneNumber}
                      onChange={(e) => updateField("PhoneNumber", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 block">WhatsApp Number</Label>
                    <Input
                      type="tel"
                      placeholder="e.g. 0300-1234567"
                      value={formData.WhatsAppNumber}
                      onChange={(e) => updateField("WhatsAppNumber", e.target.value)}
                    />
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