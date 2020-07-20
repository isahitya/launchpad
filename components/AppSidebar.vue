<template>
  <div class="app-sidebar">
    <div class="sidebar-item highlighted-item"><h1>Dashboard</h1></div>
    <div class="sidebar-item"><h1>Compute</h1></div>
    <div class="sidebar-item"><h1>Storage & CDN</h1></div>
    <div class="sidebar-item"><h1>Database</h1></div>
    <div class="sidebar-item"><h1>Networking</h1></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.app-sidebar {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.sidebar-item {
  margin: 0px;
  width: 12rem;
}

.sidebar-item h1 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 0.8rem;
  font-weight: 400;
  font-size: 1rem;
  color: rgb(111, 182, 211);
}

.highlighted-item {
  border-radius: 5px;
  background-color: rgb(80, 149, 206);
}

.highlighted-item h1 {
  color: white;
}
</style>
