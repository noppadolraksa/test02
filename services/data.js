export const questions = [
  { id: 1, order_item: 2, question_type: 'TEXT', question_text: 'name', placeholder: 'ชื่อ', regex: '^[a-zA-Zก-์]{5,}$', warning: 'กรุณากรอกชื่อ ความยาวไม่ต่ำกว่า 5 ตัวอักษร', choice: null },
  { id: 2, order_item: 1, question_type: 'MESSAGE', question_text: 'สวัสดี', placeholder: 'ชื่อ', regex: '^[a-zA-Zก-์]{5,}$', warning: 'กรุณากรอกชื่อ ความยาวไม่ต่ำกว่า 5 ตัวอักษร', choice: null },
  { id: 3, order_item: 3, question_type: 'TEXT', question_text: 'surname', placeholder: 'นามสกุล', regex: '^[a-zA-Zก-์]{5,}$', warning: 'กรุณากรอกนามสกุล ความยาวไม่ต่ำกว่า 5 ตัวอักษร', choice: null },
  { id: 4, order_item: 5, question_type: 'CHECKBOX', question_text: 'ยอมรับข้อตกลงมั้ย', placeholder: 'ยอมรับ', regex: '', warning: 'กรุณาติ๊ก', choice: null },
  { id: 5, order_item: 4, question_type: 'RADIO', question_text: 'กรุณาเลือก', placeholder: 'ยอมรับ', regex: '', warning: 'กรุณาติ๊ก', choice: 'Facebook,Youtube,Instagram' },
  { id: 6, order_item: 6, question_type: 'IMAGE', question_text: 'อัพโหลดรูปภาพ', placeholder: 'upload', regex: '', warning: 'กรุณาติ๊ก', choice: null },
];
