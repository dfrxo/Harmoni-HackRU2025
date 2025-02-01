const mongoose = require('mongoose');
const db = require('./server/db'); // Your database connection file
const Artist = require('./server/models/artists'); // Import one of your schemas

async function testArtistModel() {
  try {
    // Create a new artist
    const artist = new Artist({
      spotifyId: '12345',
      name: 'Test Artist',
      genres: ['Pop', 'Rock'],
      popularity: 80
    });

    // Save to database
    const savedArtist = await artist.save();
    console.log('🎉 Artist saved:', savedArtist);

    // Read from database
    const allArtists = await Artist.find();
    console.log('📋 All artists:', allArtists);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close(); // Close connection after test
  }
}

testArtistModel();
