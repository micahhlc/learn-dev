<template>
   <div>
     <h2>Named Color ↔ HEX Converter</h2>
     <div>
       <label>Named Color:</label>
       <input type="text" v-model="namedColor" />
     </div>
     <div>
       <label>HEX Color:</label>
       <input type="text" v-model="hexColor" />
     </div>
     <div :style="{ backgroundColor: hexColor }" class="color-preview"></div>
   </div>
 </template>
 <script>
 export default {
   data() {
     return {
       namedColor: "red", // Default named color
       hexColor: "#ff0000", // Default HEX color
     };
   },
   watch: {
     // Watch for changes in namedColor and update hexColor
     namedColor(newColor) {
       this.hexColor = this.namedToHex(newColor) || "#000000"; // Default to black if invalid
     },
     // Watch for changes in hexColor and update namedColor
     hexColor(newHex) {
       this.namedColor = this.hexToNamed(newHex) || "unknown"; // Default to "unknown" if no match
     },
   },
   methods: {
     // Convert named color to HEX
     namedToHex(colorName) {
       // Create a temporary element to get the computed color
       const tempElement = document.createElement("div");
       tempElement.style.color = colorName;
       document.body.appendChild(tempElement);
 
       // Get the computed color in RGB format
       const computedColor = getComputedStyle(tempElement).color;
       document.body.removeChild(tempElement);
 
       // Convert RGB to HEX
       const rgbMatch = computedColor.match(/\d+/g); // Extract RGB values
       if (rgbMatch) {
         const r = parseInt(rgbMatch[0]).toString(16).padStart(2, "0");
         const g = parseInt(rgbMatch[1]).toString(16).padStart(2, "0");
         const b = parseInt(rgbMatch[2]).toString(16).padStart(2, "0");
         return `#\${r}\${g}\${b}`;
       }
       return null; // Return null if the color is invalid
     },
     // Convert HEX to named color (basic mapping)
     hexToNamed(hex) {
       const hexToNameMap = {
         "#ff0000": "red",
         "#00ff00": "lime",
         "#0000ff": "blue",
         "#ffff00": "yellow",
         "#ffa500": "orange",
         "#800080": "purple",
         "#000000": "black",
         "#ffffff": "white",
         "#808080": "gray",
         "#008000": "green",
       };
       return hexToNameMap[hex.toLowerCase()] || null; // Return null if no match
     },
   },
 };
 </script>
 <style scoped>
 .color-preview {
   width: 100px;
   height: 100px;
   margin-top: 20px;
   border: 1px solid #000;
 }
 </style>
 