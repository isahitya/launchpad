export default async function({ store, redirect }) {
  try {
    if (!store.state.auth.loggedIn) {
      console.log("Not logged in");
      return redirect("/register");
    }
    let loaded = await store.dispatch("appLogic/loadIndexPage");
    if (!loaded) {
      console.log("Couldn't load data from server");
    }
  } catch (err) {
    console.log(err);
  }
}
