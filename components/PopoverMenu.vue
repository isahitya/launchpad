<template>
  <div class="popover-menu">
    <!-- <div class="popover-menu__tip"></div> -->
    <div class="popover-menu__content">
      <div class="popover-menu__content-item">
        <img src="https://img.icons8.com/ios/50/000000/export.png" />
        <h1>Logout</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.popover-menu {
  position: absolute;
  right: 2rem;
  top: 3.8rem;
}

.popover-menu__tip {
  /* height: 3rem;
  width: 3rem;
 
  top: -1rem;
  right: 1.3rem;
  background-color: white;
  transform: rotate(45deg);
  clip: rect(0px, 60px, 200px, 0px);
  z-index: 1;  
   */
  position: absolute;
  top: -2rem;
  right: 0.9rem;
  width: 0;
  height: 0;
  border-left: 2rem solid transparent;
  border-right: 2rem solid transparent;
  border-bottom: 2rem solid white;
}

.popover-menu__content {
  z-index: 10;
  background-color: white;
  box-shadow: 0px 2px 4px 2px rgb(0, 0, 0, 0.15);
  height: auto;
  width: 7.5rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}

.popover-menu__content-item {
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 1rem;
  margin-right: 1rem;
}

.popover-menu__content-item img {
  height: 1rem;
}

.popover-menu__content-item h1 {
  margin: 0px;
  margin-left: 0.5rem;
  font-size: 1rem;
  font-weight: 300;
}
</style>
