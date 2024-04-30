({
  doSomthing(a, b) {
    console.log({ a, b });
  },

  async doSomthingElse(name) {
    console.log({ name });
  },

  collection: new Map(),
})
