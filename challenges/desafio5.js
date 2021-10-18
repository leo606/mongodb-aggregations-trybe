db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      cast: { $exists: true },
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      countries: 1,
      cast: 1,
      tomatoes: 1,
      num_favs: {
        $size: {
          $setIntersection: [
            "$cast",
            ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
          ],
        },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      title: 1,
    },
  },
]);
