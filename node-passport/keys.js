'use strict';

exports.DATABASE_URL = 
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb+srv://Node_Blog_Capstone_Admin:Password123!@cluster0-7gzla.mongodb.net/test?retryWrites=true&w=majority';
    exports.PORT = process.env.PORT || 3000;
    exports.JWT_SECRET = process.env.JWT_SECRET;
    exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
