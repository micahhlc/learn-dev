<template>
   <div>
     <h2>Component Three</h2>
     <input type="color" v-model="bgColor" />
     <div :style="{ backgroundColor: bgColor }" class="color-preview"></div>
     <div><label>HEX</label><input type="text" v-model="bgColor" /></div>
     <div>
       <div>
         <h2>Custom HSL Color Picker</h2>
         <table>
           <thead>
             <tr>
               <th>Property</th>
               <th>Value</th>
               <th>Adjust</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td>Hue</td>
               <td>{{ hslColor.h }}°</td>
               <td>
                 <input
                   type="range"
                   min="0"
                   max="360"
                   v-model.number="hslColor.h"
                 />
               </td>
             </tr>
             <tr>
               <td>Saturation</td>
               <td>{{ hslColor.s }}%</td>
               <td>
                 <input type="range" min="0" max="100" v-model="hslColor.s" />
               </td>
             </tr>
             <tr>
               <td>Lightness</td>
               <td>{{ hslColor.l }}%</td>
               <td>
                 <input type="text" min="0" max="100" v-model="hslColor.l" />
               </td>
             </tr>
           </tbody>
         </table>
         <!-- #p4 {background-color: hsl(120, 60%, 70%);}    /* pastel green */ -->
 
         <div
           :style="{ backgroundColor: hslString }"
           class="color-preview"
         ></div>
         <p>HSL: {{ hslColor.h }} {{ hslColor.s }} {{ hslColor.l }}</p>
       </div>
     </div>
   </div>
 </template>
 
 <script>
 export default {
   data() {
     return {
       bgColor: "#ffffff", // Default color in HEX
     };
   },
   computed: {
     // Two-way computed property for HSL
     hslColor: {
       get() {
         return this.hexToHsl(this.bgColor); // Convert HEX to HSL
       },
     },
     hslString() {
       let fullName = `John \${this.hslColor.h} \${this.hslColor.s}`	
       console.log(fullName); // Output: "John Doe"
       return fullName;
     },
   },
 
   watch: {
     hslColor: {
       handler(newValue) {
         console.log("HSL Updated:", newValue);
       },
       deep: true, // Watch nested properties
     },
   },
   methods: {
     hexToHsl(hex) {
       // Remove the '#' if it exists
       hex = hex.replace("#", "");
 
       // Parse the r, g, b values
       let r = parseInt(hex.substring(0, 2), 16);
       let g = parseInt(hex.substring(2, 4), 16);
       let b = parseInt(hex.substring(4, 6), 16);
 
       // Convert r, g, b to percentages
       r /= 255;
       g /= 255;
       b /= 255;
 
       // Find the min and max values to get the lightness
       let max = Math.max(r, g, b);
       let min = Math.min(r, g, b);
       let h, s, l;
       l = (max + min) / 2;
 
       if (max === min) {
         h = s = 0; // Achromatic (gray)
       } else {
         let d = max - min;
         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
 
         switch (max) {
           case r:
             h = (g - b) / d + (g < b ? 6 : 0);
             break;
           case g:
             h = (b - r) / d + 2;
             break;
           case b:
             h = (r - g) / d + 4;
             break;
         }
 
         h /= 6;
       }
 
       // Convert h, s, l to percentages
       h = Math.round(h * 360); // Hue in degrees
       s = Math.round(s * 100); // Saturation in percentage
       l = Math.round(l * 100); // Lightness in percentage
       console.log(h, s, l);
       return { h, s, l };
     },
   },
 };
 </script>
 
 <style scoped>
 table {
   width: 100%;
   border-collapse: collapse;
   margin-top: 20px;
 }
 
 th,
 td {
   border: 1px solid #ddd;
   padding: 8px;
   text-align: center;
 }
 
 th {
   background-color: #f4f4f4;
 }
 
 .color-preview {
   width: 200px;
   height: 100px;
   margin-top: 20px;
   border: 1px solid #000;
 }
 </style>
 