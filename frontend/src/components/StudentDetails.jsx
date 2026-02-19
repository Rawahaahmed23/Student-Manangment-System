import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const StudentDetails = ({ student }) => {

  return (
    <div className="w-80 bg-white border-l p-6 space-y-6 overflow-auto">
      <h2 className="text-sm font-semibold text-gray-700">Student Details</h2>
      
      <div className="space-y-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">REF ID</div>
          <div className="text-sm font-medium text-gray-800">{student.id}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-1">FIRST NAME</div>
          <div className="text-sm font-medium text-gray-800">{student.firstName}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-1">LAST NAME</div>
          <div className="text-sm font-medium text-gray-800">{student.lastName}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-1">GENDER</div>
          <div className="text-sm font-medium text-gray-800">{student.gender}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-1">EMAIL</div>
          <div className="text-sm text-blue-500">{student.email}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-1">ADDRESS</div>
          <div className="text-sm text-gray-800">{student.address}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-1">DEPARTMENT</div>
          <div className="text-sm font-medium text-gray-800">{student.department}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-1">CLASS</div>
          <div className="text-sm font-medium text-gray-800">{student.class}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-1">DATE CREATED</div>
          <div className="text-sm text-gray-800">{student.dateCreated}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-1">STUDENT STATUS</div>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 font-medium">
            {student.status}
          </Badge>
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <Button variant="outline" className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50">
          EDIT
        </Button>
        <Button variant="outline" className="flex-1 text-red-600 border-red-600 hover:bg-red-50">
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default StudentDetails;