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

  describe("new sheet", function () {
    it("creates new property", function () {
      var property = new SheetProperty(1);
      expect(property.title    ).toBeNull();
      expect(property.startDate).toBeNull();
      expect(property.goalDate ).toBeNull();
      expect(property.done     ).toEqual(0);
      expect(property.delay    ).toEqual(0);
      expect(property.yet      ).toEqual(1000);
      expect(property.total    ).toEqual(1000);
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
        done: 10,
        delay: 5,
        yet: 985
      };
      localStorage.setItem("sheet[1]", JSON.stringify(data));
    });

    it("loads properties", function () {
      var property = SheetProperty.load(1);
      expect(property.title              ).toEqual(data.title       );
      expect(property.startDate          ).toEqual(jasmine.any(Date));
      expect(property.startDate.getTime()).toEqual(data.startDate   );
      expect(property.goalDate           ).toEqual(jasmine.any(Date));
      expect(property.goalDate.getTime() ).toEqual(data.goalDate    );
      expect(property.done               ).toEqual(data.done        );
      expect(property.delay              ).toEqual(data.delay       );
      expect(property.yet                ).toEqual(data.yet         );
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
  });

  describe("#_adjustStatus", function () {
    var patterns = [
      {
        prepare : {done:    0, delay:    0, yet:    0, total: 1000},
        modify  : {done: 1000},
        expected: {done: 1000, delay:    0, yet:    0, total: 1000},
      },
      {
        prepare : {done:    0, delay:    0, yet:    0, total: 1000},
        modify  : {done: 1000, delay: 1000, yet: 1000},
        expected: {done: 1000, delay:    0, yet:    0, total: 1000},
      },
      {
        prepare : {done:  400, delay:  300, yet:  100, total: 1000},
        modify  : {done:  800},
        expected: {done:  800, delay:  200, yet:    0, total: 1000},
      },
      {
        prepare : {done:  300, delay:  500, yet:  200, total: 1000},
        modify  : {done:  800},
        expected: {done:  800, delay:  200, yet:    0, total: 1000},
      },
      {
        prepare : {done:  600, delay:  300, yet:  100, total: 1000},
        modify  : {                                    total:  500},
        expected: {done:  500, delay:    0, yet:    0, total:  500},
      },
      {
        prepare : {done:  500, delay:  300, yet:  100, total: 1000},
        modify  : {                                    total: 2000},
        expected: {done:  500, delay:  300, yet: 1200, total: 2000},
      }
    ];

    patterns.forEach(function (pattern, i) {
      it(i + ": adjusts status", function () {
        var property = new SheetProperty(1, pattern.prepare);
        for (var key in pattern.modify) {
          property[key] = pattern.modify[key];
        }

        for (var key in pattern.expected) {
          expect(property[key]).toEqual(pattern.expected[key]);
        }
      });
    });
  });
});
