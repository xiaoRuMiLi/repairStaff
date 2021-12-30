<template>
    <div class="remind-item" @click="tapItem( ind )">
        <div class="remind-msg">
            <span class= "remind-msg-num">
                {{num}}
            </span>
            <span class="remind-info">
                {{msg}}
            </span>
        </div>
    </div>
</template>   

<script src="./index.js"></script>  
<style src="./index.css" scoped></style>

      