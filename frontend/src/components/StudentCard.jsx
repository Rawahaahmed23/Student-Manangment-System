import { Edit2, Trash2, Phone, Calendar } from "lucide-react";

const GENDER_COLORS = {
  Male: "bg-sky-50 text-sky-600",
  Female: "bg-pink-50 text-pink-600",
};

function Avatar({ name, profileImage }) {
  const initials = `${name?.charAt(0) ?? ""}`;

  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt={name}
        className="w-10 h-10 rounded-xl object-cover"
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-semibold text-slate-500">
      {initials}
    </div>
  );
}

function StudentCard({ student }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col gap-3 shadow-sm hover:shadow-md">

 
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

          <Avatar
            name={student.StudentName}
            profileImage={student.profileImage?.url}
          />

          <div>
            <p className="font-semibold text-sm">
              {student.StudentName}
            </p>

            <p className="text-xs text-slate-400">
              GR# {student.GrNumber}
            </p>
          </div>

        </div>

        <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded-full">
          {student.Class}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">

        <div>
          <p className="text-xs text-slate-400">Father</p>
          <p>{student.FatherName}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Gender</p>
          <span className={`px-2 py-1 rounded-full text-xs ${GENDER_COLORS[student.Gender]}`}>
            {student.Gender}
          </span>
        </div>

        <div>
          <p className="text-xs text-slate-400">DOB</p>
          <p className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(student.DateOfBirth).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Admission</p>
          <p className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(student.DateOfAdmission).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Fee</p>
          <p className="font-semibold">
            Rs. {student.MonthlyFee}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Fee Status</p>
          <p
            className={`text-xs px-2 py-1 rounded-full ${
              student.FeeStatus === "Paid"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {student.FeeStatus}
          </p>
        </div>

      </div>

     
      <div className="flex gap-2 pt-2">
        <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-50 rounded-xl text-xs">
          <Edit2 className="w-3 h-3" />
          Edit
        </button>

        <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-50 text-red-500 rounded-xl text-xs">
          <Trash2 className="w-3 h-3" />
          Delete
        </button>
      </div>

    </div>
  );
}

export default StudentCard;