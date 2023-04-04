const express = require('express');
const router = express.Router();


router.use('/course',require('../api/courses/routes/routes'));
router.use('/conversation',require('../api/messaging/controllers/conversation'));
router.use('/messaging',require('../api/messaging/controllers/messaging'));
router.use('/notifications', require('../api/notification/routes/notification'));
router.use('/student', require('../api/students/routes/routes'));
router.use('/tutor', require('../api/tutors/routes/routes'));
router.use('/learningpath', require('../api/learning-paths/routes/routes'));
router.use('/event', require('../api/events/routes/routes'));
router.use('/feedback',require('../api/feedback/routes/routes'))
router.use('/user',require('../api/userManagement/controllers/user'));
router.use('/forum',require('../api/forum/controllers/forum'));
router.use('/upload',require('../api/upload/routes/routes'));
router.use('/blog',require('../api/blogs/controllers/blogs'));

module.exports = router;