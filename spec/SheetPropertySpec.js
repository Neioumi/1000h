describe("SheetProperty", function () {
  afterEach(function () {
    localStorage.clear();
  });

  describe(".createId", function () {
    it("returns 1 when id_sequence not exists", function () {
      SheetProperty.remove(1);
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

  describe(".index", function () {
    it("returns sheet index when index exists", function () {
      localStorage.setItem("sheet_index", "[1,2]");
      expect(SheetProperty.index()).toEqual([1, 2]);
    });

    it("returns an empty array when index does not exist", function () {
      expect(SheetProperty.index()).toEqual([]);
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

  describe(".load", function () {
    var data;
    beforeEach(function () {
      var date = new Date();
      data = {
        title: "title for sheet1",
        startDate: date.getTime(),
        goalDate: date.getTime() + 86400,
      };
      localStorage.setItem("sheet[1]", JSON.stringify(data));
    });

    it("loads properties", function () {
      var property = SheetProperty.load(1);
      expect(property.title).toEqual(data.title);
      expect(property.startDate).toEqual(jasmine.any(Date));
      expect(property.startDate.getTime()).toEqual(data.startDate);
      expect(property.goalDate).toEqual(jasmine.any(Date));
      expect(property.goalDate.getTime()).toEqual(data.goalDate);
    });
  });

  describe("#save", function () {
    var date, property;

    beforeEach(function () {
      date = new Date();
      property = new SheetProperty(1, {
        title: "title for sheet1",
        startDate: date,
        goalDate: new Date(date.getTime() + 86400)
      });
    });

    it("saves properties", function () {
      var expected = JSON.stringify({
        title: "title for sheet1",
        startDate: date.getTime(),
        goalDate: date.getTime() + 86400
      });

      property.save();
      expect(localStorage.getItem("sheet[1]")).toEqual(expected);
    });

    it("adds sheet ID into sheet index when it has not been indexed", function () {
      property.save();
      expect(localStorage.getItem("sheet_index")).toEqual("[1]");
    });

    it("doesn't add sheet ID into sheet index when it has been indexed", function () {
      localStorage.setItem("sheet_index", "[1]");
      property.save();
      expect(localStorage.getItem("sheet_index")).toEqual("[1]");
    });
  });

  describe("#remove", function () {
    var property;

    beforeEach(function () {
      property = new SheetProperty(1, {
        title: "title for sheet1"
      });
    });

    it("removes all data associated with the sheet", function () {
      property.save();
      expect(localStorage.getItem("sheet[1]")).not.toBeNull();

      property.remove();
      expect(localStorage.getItem("sheet[1]")).toBeNull();
    });

    it("removes sheet ID from sheet index when it has been indexed", function () {
      localStorage.setItem("sheet_index", "[1,2]");
      property.remove();
      expect(localStorage.getItem("sheet_index")).toEqual("[2]");
    });
  });
});
