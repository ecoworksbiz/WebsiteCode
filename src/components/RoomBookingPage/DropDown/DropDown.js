// import React, {useState } from "react";
// import { default as ReactSelect } from "react-select";
// import { components } from "react-select";


// const DropDown = () => {
//   const [optionSelected, setOptionSelected] = useState([]);
//   const [Requirement, setRequirement] = useState([]);

//   const handleChange = (selected) => {
//     setOptionSelected(selected);

//     const result = optionSelected.map((a) => a.value);

//     setRequirement(result);

//     console.log("op",Requirement);
//   };

//   return (
//     <div
//       class="d-inline-block"
//       data-toggle="popover"
//       data-trigger="focus"
//       data-content="Please selecet account(s)"
//     >
//       <ReactSelect
//         options={additionalRequirementList}
//         isMulti
//         closeMenuOnSelect={false}
//         hideSelectedOptions={false}
//         components={{
//           Option,
//         }}
//         onChange={handleChange}
//         allowSelectAll={true}
//         value={optionSelected}
//       />
//     </div>
//   );
// };

// export default DropDown;
