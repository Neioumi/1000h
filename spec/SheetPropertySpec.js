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
      expect(property.title      ).toBeNull();
      expect(property.startDate  ).toBeNull();
      expect(property.goalDate   ).toBeNull();
      expect(property.done       ).toEqual(0);
      expect(property.delay      ).toEqual(0);
      expect(property.yet        ).toEqual(1000);
      expect(property.total      ).toEqual(1000);
      expect(property.hoursPerDay).toEqual(8);
    });
  });

  describe(".load", function () {
    var data;
    beforeEach(function () {
      var date = new Date(2014, 2, 2);
      data = {
        title: "title for sheet1",
        startDate: date.getTime(),
        goalDate: date.getTime() + 86400000,
        done: 10,
        total: 1000,
        hoursPerDay: 8
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
      expect(property.delay              ).toEqual(0                );
      expect(property.yet                ).toEqual(990              );
      expect(property.total              ).toEqual(1000             );
      expect(property.hoursPerDay        ).toEqual(8                );
    });
  });

  describe("#save", function () {
    var date, property;

    beforeEach(function () {
      date = new Date(2014, 2, 2);
      property = new SheetProperty(1, {
        title: "title for sheet1",
        startDate: date,
        goalDate: new Date(date.getTime() + 86400000)
      });
    });

    it("saves properties", function () {
      var expected = {
        title: "title for sheet1",
        startDate: date.getTime(),
        goalDate: date.getTime() + 86400000,
        done: 0,
        total: 1000,
        hoursPerDay: 8
      };

      property.save();
      expect(JSON.parse(localStorage.getItem("sheet[1]"))).toEqual(expected);
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

  describe("#getElapsedTime", function () {
    var property;

    beforeEach(function () {
      property = new SheetProperty(1, {
        startDate: new Date(2014, 2, 2)
      });
    });

    it("returns 86400000 when 1 day after", function () {
      expect(property.getElapsedTime(new Date(2014, 2, 3))).toEqual(86400000);
    });

    it("returns 0 if the startDate is null", function () {
      property.startDate = null;
      expect(property.getElapsedTime()).toEqual(0);
    });
  });

  describe("#getDelay", function () {
    var property;

    beforeEach(function () {
      property = new SheetProperty(1, {
        startDate: new Date(2014, 2, 2)
      });
    });

    var patterns = [
      {done:  8, expected:  0},
      {done: 10, expected: -2},
      {done:  6, expected:  2},
      {done:  0, expected:  8},
    ];

    patterns.forEach(function (pattern, i) {
      it("pattern" + i + ": returns " + pattern.expected + " when done=" + pattern.done, function () {
        property.done = pattern.done;
        expect(property.getDelay(new Date(2014, 2, 3))).toEqual(pattern.expected);
      });
    });

    it("return 0 if the startDate is null", function () {
      property.startDate = null;
      property.done = 0;
      expect(property.getDelay(new Date(2014, 2, 3))).toEqual(0);
    });
  });

  describe("delay property", function () {
    var property;

    beforeEach(function () {
      property = new SheetProperty(1, {
        startDate: new Date(2014, 2, 2)
      });
    });

    it("returns the delay when #getDelay returns positive value", function () {
      spyOn(property, "getDelay").and.returnValue(8);
      expect(property.delay).toEqual(8);
    });

    it("returns 0 when #getDelay returns negative value", function () {
      spyOn(property, "getDelay").and.returnValue(-2);
      expect(property.delay).toEqual(0);
    });
  });

  describe("yet property", function () {
    var property;

    beforeEach(function () {
      property = new SheetProperty(1, {
        startDate: new Date(2014, 2, 2)
      });
    });

    var patterns = [
      {done:  8, delay: 0, expected: 992},
      {done:  0, delay: 8, expected: 992},
      {done:  6, delay: 2, expected: 992},
    ];

    patterns.forEach(function (pattern, i) {
      it("pattern" + i + ": returns " + pattern.expected + " when done=" + pattern.done + ", delay=" + pattern.delay, function () {
        property.done = pattern.done;
        spyOn(property, "getDelay").and.returnValue(pattern.delay);
        expect(property.yet).toEqual(pattern.expected);
      });
    });
  });

  describe("startDate property", function () {
    var property;

    beforeEach(function () {
      property = new SheetProperty(1);
    });

    it("keeps time part as 00:00:00", function () {
      property.startDate = new Date(2014, 2, 2, 10, 20, 30);
      expect(property.startDate).toEqual(new Date(2014, 2, 2, 0, 0, 0));
    });
  });
});
