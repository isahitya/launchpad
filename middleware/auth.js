export default async function({ store, redirect }) {
  try {
    let loaded = await store.dispatch("loadIndexPage");
    if (!loaded) {
      redirect("/register");
    }
  } catch (err) {
    console.log(err);
  }
}
