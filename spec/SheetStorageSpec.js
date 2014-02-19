describe("SheetStorage", function () {
  var storage;

  beforeEach(function () {
    storage = new SheetStorage(1);
  });

  afterEach(function () {
    localStorage.clear();
  });

  describe(".createId", function () {
    it("returns 1 when id_sequence not exists", function () {
      expect(SheetStorage.createId()).toEqual(1);
    });

    it("returns 2 when id_sequence=1", function () {
      localStorage.setItem("sheet_id_sequence", 1);
      expect(SheetStorage.createId()).toEqual(2);
    });

    it("stores last sequence id as sheet_id_sequence", function () {
      var id = SheetStorage.createId();
      expect(localStorage.getItem("sheet_id_sequence")).toEqual(id.toString());
    });
  });

  describe("#get", function () {
    it('returns the value for "sheet[1].foo" when arg1=foo, id=1', function () {
      localStorage.setItem("sheet[1].foo", "value_for_foo1");
      expect(storage.get("foo")).toEqual("value_for_foo1");
    });
  });

  describe("#set", function () {
    it('store the value for "sheet[1].foo" when arg1=foo, id=1', function () {
      storage.set("foo", "value_for_foo1");
      expect(localStorage.getItem("sheet[1].foo")).toEqual("value_for_foo1");
    });
  });

  describe("#remove", function () {
    it('removes the value for "sheet[1].foo" when arg1=foo, id=1', function () {
      storage.set("foo", "value_for_foo1");
      storage.remove("foo");
      expect(localStorage.getItem("sheet[1].foo")).toBeNull();
    });
  });

  describe("#keyFor", function () {
    it('returns "sheet[1].foo" when arg1=foo, id=1', function () {
      expect(storage.keyFor("foo")).toEqual("sheet[1].foo");
    });
  });

  describe("title property", function () {
    it('returns the title when it is referred', function () {
      localStorage.setItem("sheet[1].title", "foo title");
      expect(storage.title).toEqual("foo title");
    });

    it('stores the title when set a value', function () {
      storage.title = "foo title";
      expect(localStorage.getItem("sheet[1].title")).toEqual("foo title");
    });
  });
});
