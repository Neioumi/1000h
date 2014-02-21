describe("SheetProperty", function () {
  afterEach(function () {
    localStorage.clear();
  });

  describe(".createId", function () {
    it("returns 1 when id_sequence not exists", function () {
      expect(SheetProperty.createId()).toEqual(1);
    });

    it("returns 2 when id_sequence=1", function () {
      localStorage.setItem("sheet_id_sequence", 1);
      expect(SheetProperty.createId()).toEqual(2);
    });

    it("stores last sequence id as sheet_id_sequence", function () {
      var id = SheetProperty.createId();
      expect(localStorage.getItem("sheet_id_sequence")).toEqual(id.toString());
    });
  });

  describe("new sheet", function () {
    it("creates new property", function () {
      var property = new SheetProperty(1);
      expect(property.title).toBeNull();
      expect(property.startDate).toBeNull();
      expect(property.goalDate).toBeNull();
    });
  });

  describe("existent sheet", function () {
    it("loads properties", function () {
      var date = new Date();
      var data = {
        title: "title for sheet1",
        startDate: date.getTime(),
        goalDate: date.getTime() + 86400,
      };
      localStorage.setItem("sheet[1]", JSON.stringify(data));

      var property = new SheetProperty(1);
      expect(property.title).toEqual(data.title);
      expect(property.startDate).toEqual(jasmine.any(Date));
      expect(property.startDate.getTime()).toEqual(data.startDate);
      expect(property.goalDate).toEqual(jasmine.any(Date));
      expect(property.goalDate.getTime()).toEqual(data.goalDate);
    });
  });

  describe("update property", function () {
    it("saves properties", function () {
      var property = new SheetProperty(1);
      property.title = "title for sheet1";

      var expected = JSON.stringify({
        title: "title for sheet1",
        startDate: null,
        goalDate: null
      });

      expect(property.title).toEqual("title for sheet1");
      expect(localStorage.getItem("sheet[1]")).toEqual(expected);
    });
  });

  describe("#remove", function () {
    it("removes all data associated with the sheet", function () {
      var property = new SheetProperty(1);
      property.title = "title for sheet1";
      expect(localStorage.getItem("sheet[1]")).not.toBeNull();

      property.remove();
      expect(localStorage.getItem("sheet[1]")).toBeNull();
    });
  });
});
