export default async function({ store, redirect }) {
  try {
    let loaded = await store.dispatch("loadIndexPage");
    console.log("Couldn't load data from server");
    if (!loaded) {
      //redirect("/login");
    }
  } catch (err) {
    console.log(err);
  }
}
