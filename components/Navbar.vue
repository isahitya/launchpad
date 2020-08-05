<!--
Component will generate : 
  - Hero section 
  - Tabs 
-->

<template>
  <md-toolbar class="app-header md-dense  ">
    <div class="hero">
        <img src = "~/assets/icons/rocket.png"></img>
      <h1>LaunchPad</h1>
    </div>
    
  </md-toolbar>
</template>


<style>

.app-header {
  position:fixed;
  top:0px;
}

.hero {
  margin-left: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items:center;
}

.hero h1 {
  font-weight: 400;
  color: rgb(56, 56, 56);
  font-style: italic;
  font-size: 1.15rem;
  margin-left:0.5rem;
}

.hero img {
    height:2.5rem;
}

.tabs{

display:flex;
justify-content: flex-start;
  align-items:center;
  margin-left:6rem;
}

.tabs h1 {
    font-size:1.1rem;
    font-weight:400;
    color:rgb(32, 32, 32);
    margin-left:2.5rem;
    margin-right:2.5rem;
}

.vertical-separator{
    background-color: rgb(131, 131, 131);
 box-shadow: 0 0 2px rgb(58, 58, 58);
    opacity:0.5;
    width: 1px;
    height:3rem;
}

</style>
