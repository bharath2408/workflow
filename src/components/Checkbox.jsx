import React from "react";

const Checkbox = () => {
  return (
    <div class="flex items-center space-x-2">
      <input type="checkbox" id="customCheckbox" class="hidden" />
      <label
        for="customCheckbox"
        class="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 cursor-pointer select-none"
      >
        <span class="text-sm font-semibold text-gray-600" id="checkboxLabel">
          AB
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
