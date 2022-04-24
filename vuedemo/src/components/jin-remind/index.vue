<template>
  <div class="remind-container">
    <div class="remind-title-div">
      <span class="remind-title-span">
        {{remindTitle}}
      </span>
    </div>
    <div class="remind-panel">
      <slot name="item"></slot>
    </div> 
  </div>
</template>

<script src="./index.js"></script>  
<style src="./index.css" scoped></style>