module.exports = {
    supportedMimes: {
      'text/csv': 'csv',
      'application/pdf':'pdf',
      'image/jpeg':'jpg',
      'image/png':'png'
    },
    uploadsFolder: 'uploads',
    dbConnection: process.env.MONGODB_URL
}