<template>
  <div class="sideBar">
    <div size="small" id="cardUser">
      <vs-icon icon="account_box" color="#ffffff" size="50px"></vs-icon>
      <div id="txtCardUser">
        <h3>Nom Prénom</h3>
        <p>Psychologue</p>
      </div>
      <div id="settings"><vs-icon icon="settings" color="rgb(189, 189, 189)"></vs-icon></div>
    </div>
    <div id="tag">
      <h3>Patients</h3>
      <h3>Résultats</h3>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SideBar'
}
</script>

<style scoped>
.sideBar {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color:#ffffff;
    box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.2);
}
#cardUser {
    height: 12%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: #9082FF;
    padding: 0 15px;
    margin-top: 15px;
    border-radius: 10px;
}
#avatarUser {
    margin: 0 15px 0 0;
}
#txtCardUser {
    display: flex;
    flex-direction: column;
    text-align: left;
}
#settings {
    background-color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    margin-left: 5px;
}
#tag {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    align-items: flex-start;
    margin-left: 11%;
}
</style>