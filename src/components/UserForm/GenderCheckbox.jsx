const GenderCheckbox = ({ onCheckboxChange, selectedGender, errors }) => {
  return (
    <div className="flex gap-4" data-testid="gender-checkbox">
      <div className="form-control">
        <label className={`relative label gap-2 cursor-pointer`}>
          <span className="label-text text-xs text-neutral-100">Male</span>
          <input type="checkbox" className={`checkbox checkbox-secondary border-secondary ${errors.gender ? "border-rose-800 hover:border-rose-800" : ""}`} checked={selectedGender === "male"} onChange={() => onCheckboxChange("male")} />
          {errors.gender && selectedGender === "" && (
            <span data-testid="gender-error" className="text-rose-500 text-xs absolute -bottom-7">
              Gender {""}
              {errors.gender.message}
            </span>
          )}
        </label>
      </div>
      <div className="form-control">
        <label className={`relative label gap-2 cursor-pointer`}>
          <span className="label-text text-xs text-neutral-100">Female</span>
          <input type="checkbox" className={`checkbox checkbox-secondary border-secondary ${errors.gender ? "border-rose-800 hover:border-rose-800" : ""}`} checked={selectedGender === "female"} onChange={() => onCheckboxChange("female")} />
          {errors.gender && selectedGender === "" && (
            <span data-testid="gender-error" className="text-rose-500 text-xs absolute -bottom-7">
              Gender {""}
              {errors.gender.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
