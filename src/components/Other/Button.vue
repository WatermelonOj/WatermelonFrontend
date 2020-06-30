<template>
  <button class="MyButton" :style="MyButton" @mouseenter="moveIn" @mouseleave="moveOut">{{ this.context }}</button>
</template>

<script>
    export default {
        name: "Button",
      props:['col', 'context'],
      data(){
        return{
          MyButton:{ backgroundColor: 'rgba(' + this.col + ',0)' ,
            borderColor: 'rgb(' + this.col + ')' ,
            color: 'rgb(' + this.col + ')' },
        }
      },
      methods:{
        moveIn(){
          this.MyButton.backgroundColor = 'rgba(' + this.col + ',1)';
          this.MyButton.color = 'white';
        },
        moveOut(){
          this.MyButton.backgroundColor = 'rgba(' + this.col + ',0)'
          this.MyButton.color = 'rgb(' + this.col + ')';
        }
      }
    }
</script>

<style scoped>
  .MyButton{
    border-radius: 5px;
    font-size: 18px;
    padding:6px 14px;
    outline:none;transition: 0.4s;
    border:2px solid;
    cursor: pointer;
    font-family: BPreplay;
  }
</style>
