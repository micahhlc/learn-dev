<template>
  <h3>Todo List</h3>
  <ul>
    <todo-item
      v-for="x in items"
      :key="x.id"
      :id="x.id"
      :item-name="x.name"
      @remove-item="removeItem"
    />
  </ul>
  <input v-model="newItem" @keyup.enter="addItem" />
  <button @click="addItem">Add</button>

  <!-- Alert message -->
  <p v-if="alertMessage" class="alert">{{ alertMessage }}</p>

</template>

<script>
export default {
  data() {
    return {
      newItem: "",
      alertMessage: "", // Alert message for duplicate items
      items: [
        { id: 1, name: "Buy apples" },
        { id: 2, name: "Make pizza" },
        { id: 3, name: "Mow the lawn" },
        { id: 4, name: "Buy apples" }, // Duplicate name, but unique id
      ],
    };
  },
  methods: {
    addItem() {
      if (this.newItem.trim() === "") {
        this.showAlert("Item cannot be empty!");
        return; // Prevent adding empty items
      }
      if (this.items.some((x) => x.name === this.newItem.trim())) {
        this.showAlert("Item already exists!");
        return; // Prevent adding duplicate items
      }
      const newItemwithID = { id: Date.now(), name: this.newItem }; // Use Date.now() for a unique id
      this.items.push(newItemwithID), 
      (this.newItem = "");
    },
    removeItem(id) {
      this.items = this.items.filter((x) => x.id !== id);
    },
    showAlert(message) {
      this.alertMessage = message;
      setTimeout(() => {
        this.alertMessage = "";
      }, 3000);
    },
  },
};
</script>
<style>
/* Add some basic styling for the alert */
.alert {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>