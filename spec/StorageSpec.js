describe("Storage", function () {
  afterEach(function () {
    localStorage.clear();
  });

  describe("#get", function () {
    it("returns specified default value when it does not exist", function () {
      expect(Storage.get("foo", 123)).toEqual(123);
    });

    it("returns null when it does not exist and defaultValue is ommitted", function () {
      expect(Storage.get("foo")).toBeNull();
    });
  });

  describe("#getJSON", function () {
    it("fetches the value as JSON", function () {
      var obj = {foo: 123};
      localStorage.setItem("foo", JSON.stringify(obj));
      expect(Storage.getJSON("foo")).toEqual(obj);
    });

    it("returns specified default value when it does not exist", function () {
      expect(Storage.getJSON("foo", 123)).toEqual(123);
    });

    it("throws an error when the value is not JSON string", function () {
      // "bar" <= JSON string
      // bar   <= NOT JSON string
      localStorage.setItem("foo", "bar");
      expect(function () {
        Storage.getJSON("foo");
      }).toThrow();
    });
  });

  describe("#setJSON", function () {
    it("stores the value as JSON", function () {
      var obj = {foo: 123};
      Storage.setJSON("foo", obj);
      expect(localStorage.getItem("foo")).toEqual(JSON.stringify(obj));
    });
  });

  describe("#keys", function () {
    it("returns all keys", function () {
      Storage.set("foo", 1);
      Storage.set("bar", 2);
      expect(Storage.keys().slice().sort()).toEqual(["foo", "bar"].sort());
    });
  });

  describe("#has", function () {
    it("returns true when the key exists", function () {
      Storage.set("foo", 1);
      expect(Storage.has("foo")).toBe(true);
    });

    it("returns false when the key does not exist", function () {
      expect(Storage.has("foo")).toBe(false);
    });
  });
});
