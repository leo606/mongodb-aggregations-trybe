db.trips.aggregate([
  {
    $addFields: {
      weekDay: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $match: {
      weekDay: 5,
    },
  },
  {
    $group: {
      _id: {
        stationId: "$startStationId",
        stationName: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.stationName",
      total: "$total",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]);
