<!--
Component will generate : 
  - Hero section 
  - Tabs 
-->

<template>
  <header class="app-header">
    <div class="hero">
        <img src = "~/assets/icons/rocket.png"></img>
      <h1>LaunchPad</h1>
    </div>
    <div class = "tabs">
        <h1>Home</h1>
        <div class = "vertical-separator"></div>
        <h1>Work</h1>
        <div class = "vertical-separator"></div>
        <h1>HR</h1>
    </div>
  </header>
</template>


<style>
.app-header {
  margin: 0px;
  z-index: 100;
  top: 0px;
  width: 100vw;
  position: fixed;
  box-shadow: 2px 1px 5px 3px rgb(0, 0, 0, 0.25);
  height: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
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
