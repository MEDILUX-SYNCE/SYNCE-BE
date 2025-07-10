const sequelize = require('../config/database');
const Sequelize = require('sequelize');
const db = {};

db.User = require("./schemas/user");
db.Patient = require("./schemas/patient");
db.Doctor = require("./schemas/doctor");
db.Hospital = require("./schemas/hospital");
db.Consent = require("./schemas/consent");
db.UserConsent = require("./schemas/user_consent");
db.AuthToken = require("./schemas/auth_token");
db.LoginHistory = require("./schemas/login_history");
db.SurgeryCategory = require("./schemas/surgery_category");
db.SurgerySubcategory = require("./schemas/surgery_subcategory");
db.SurgeryType = require("./schemas/surgery_type");
db.Surgery = require("./schemas/surgery");
db.PatientHospitalLink = require("./schemas/patient_hospital_link");
db.Checklist = require("./schemas/checklist");
db.CautionNote = require("./schemas/caution_note");
db.RecordBook = require("./schemas/record_book");
db.RecordBookSurgery = require("./schemas/record_book_surgery");
db.RecordEntry = require("./schemas/record_entry");
db.RecordImage = require("./schemas/record_image");
db.Payment = require("./schemas/payment");
db.QuestionTicket = require("./schemas/question_ticket");
db.Question = require("./schemas/question");
db.QuestionImage = require("./schemas/question_image");
db.Answer = require("./schemas/answer");
db.QuestionReport = require("./schemas/question_report");
db.AdminAction = require("./schemas/admin_action");
db.Refund = require("./schemas/refund");
db.RefundTicket = require("./schemas/refund_ticket");
db.AutoRefundSchedule = require("./schemas/auto_refund_schedule");
db.Article = require("./schemas/article");
db.Tag = require("./schemas/tag");
db.ArticleTag = require("./schemas/article_tag");
db.Notice = require("./schemas/notice");
db.NotificationSetting = require("./schemas/notification_setting");
db.Notification = require("./schemas/notification");

Object.keys(db).forEach((modelName) => {
  if (db[modelName].init) {
    db[modelName].init(sequelize);
  }
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;