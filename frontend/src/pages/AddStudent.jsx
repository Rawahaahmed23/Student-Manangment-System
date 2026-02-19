import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, User, X } from "lucide-react";

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    grNo: "",
    studentName: "",
    fatherName: "",
    class: "",
    gender: "male",
    dateOfBirth: "",
    dateOfAdmission: "",
    monthlyFee: "",
    profilePic: null,
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) updateField("profilePic", file);
  };

  const removeImage = () => {
    updateField("profilePic", null);
  };

  const handleReset = () => {
    setFormData({
      grNo: "",
      studentName: "",
      fatherName: "",
      class: "",
      gender: "male",
      dateOfBirth: "",
      dateOfAdmission: "",
      monthlyFee: "",
      profilePic: null,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
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
              <Button variant="outline" onClick={handleReset} className="flex-1 sm:flex-none border-gray-300 hover:bg-gray-50">
                Reset
              </Button>
              <Button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit}>
                Save
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
                      {formData.profilePic ? (
                        <img 
                          src={URL.createObjectURL(formData.profilePic)} 
                          alt="Profile" 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <User className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300" />
                      )}
                    </div>
                    {formData.profilePic && (
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

          
              <div className="lg:col-span-8">
                <div className="space-y-5">
         
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">G.R No</Label>
                  <Input
                    placeholder="Enter G.R Number"
                    value={formData.grNo}
                    onChange={(e) => updateField("grNo", e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Student Name</Label>
                  <Input
                    placeholder="Enter Student Name"
                    value={formData.studentName}
                    onChange={(e) => updateField("studentName", e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Father Name</Label>
                  <Input
                    placeholder="Enter Father Name"
                    value={formData.fatherName}
                    onChange={(e) => updateField("fatherName", e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Class</Label>
                  <Input
                    placeholder="Enter Class"
                    value={formData.class}
                    onChange={(e) => updateField("class", e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

           
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Gender</Label>
                <RadioGroup 
                  value={formData.gender} 
                  onValueChange={(val) => updateField("gender", val)} 
                  className="flex gap-4 sm:gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <label htmlFor="male" className="text-sm font-medium cursor-pointer">Male</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <label htmlFor="female" className="text-sm font-medium cursor-pointer">Female</label>
                  </div>
                </RadioGroup>
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Date of Birth</Label>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField("dateOfBirth", e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Date of Admission</Label>
                  <Input
                    type="date"
                    value={formData.dateOfAdmission}
                    onChange={(e) => updateField("dateOfAdmission", e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Monthly Fee */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Monthly Fee</Label>
                <Input
                  type="number"
                  placeholder="Enter Monthly Fee"
                  value={formData.monthlyFee}
                  onChange={(e) => updateField("monthlyFee", e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;