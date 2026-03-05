import React, { useState, useEffect } from 'react';

// --- BỘ DỮ LIỆU BÀI TRẮC NGHIỆM ---
// Dựa trên nội dung tài liệu bạn cung cấp, phân loại các câu hỏi vào các hình tương ứng.
// square: Vuông, triangle: Tam giác, circle: Tròn, squiggle: Lượn sóng, rectangle: Chữ nhật
const testData = {
  A: [
    { id: 'a1', text: 'Thích lãnh đạo', shape: 'triangle' },
    { id: 'a2', text: 'Có tham vọng', shape: 'triangle' },
    { id: 'a3', text: 'Dễ thông cảm, quan tâm đến người khác', shape: 'circle' },
    { id: 'a4', text: 'Chi tiết, để ý từng li từng tí', shape: 'square' },
    { id: 'a5', text: 'Cổ điển, truyền thống', shape: 'square' },
    { id: 'a6', text: 'Sáng tạo, đổi mới', shape: 'squiggle' },
    { id: 'a7', text: 'Tỉ mỉ, có đầu óc tổ chức', shape: 'square' },
    { id: 'a8', text: 'Khác thường, lập dị', shape: 'squiggle' },
    { id: 'a9', text: 'Sứ giả hòa bình, kết nối mọi người', shape: 'circle' },
    { id: 'a10', text: 'Không thích bị ràng buộc trong một khuôn khổ nào cả', shape: 'squiggle' },
    { id: 'a11', text: 'Tuân thủ nguyên tắc, nội quy', shape: 'square' },
    { id: 'a12', text: 'Đa cảm', shape: 'circle' },
    { id: 'a13', text: 'Thời điểm này tôi hay quên', shape: 'rectangle' },
    { id: 'a14', text: 'Dễ bị người khác ảnh hưởng', shape: 'rectangle' },
    { id: 'a15', text: 'Hay giúp đỡ người khác', shape: 'circle' },
    { id: 'a16', text: 'Thích cạnh tranh, thi đua', shape: 'triangle' },
    { id: 'a17', text: 'Đang trong giai đoạn có nhiều thay đổi', shape: 'rectangle' },
    { id: 'a18', text: 'Thích mạo hiểm', shape: 'triangle' },
    { id: 'a19', text: 'Thoải mái, bộc lộ cảm xúc, suy nghĩ của mình', shape: 'squiggle' },
    { id: 'a20', text: 'Hay cảm thấy bối rối, lúng túng', shape: 'rectangle' },
    { id: 'a21', text: 'Người của mọi người', shape: 'circle' },
    { id: 'a22', text: 'Bốc đồng', shape: 'squiggle' },
    { id: 'a23', text: 'Đáng tin cậy, trung thành', shape: 'square' },
    { id: 'a24', text: 'Quyết đoán', shape: 'triangle' },
    { id: 'a25', text: 'Nhanh nhẹn, mạnh mẽ', shape: 'triangle' },
    { id: 'a26', text: 'Tôi thường lóng cóng, vụng về, đổ vỡ', shape: 'rectangle' },
    { id: 'a27', text: 'Thực tế', shape: 'square' },
    { id: 'a28', text: 'Giàu ý tưởng', shape: 'squiggle' },
    { id: 'a29', text: 'Đúng giờ giấc', shape: 'square' },
    { id: 'a30', text: 'Biết lắng nghe', shape: 'circle' },
    { id: 'a31', text: 'Rộng lượng', shape: 'circle' },
    { id: 'a32', text: 'Dí dỏm, vui tính', shape: 'squiggle' },
    { id: 'a33', text: 'Tôi hay tìm tòi, khám phá', shape: 'rectangle' },
    { id: 'a34', text: 'Nhất định phải thành công', shape: 'triangle' },
    { id: 'a35', text: 'Thiếu tự tin', shape: 'rectangle' }
  ],
  B: [
    { id: 'b1', text: 'Tôi luôn là “linh hồn” của các buổi họp mặt, tiệc tùng', shape: 'squiggle' },
    { id: 'b2', text: 'Tôi khó nói không với người khác', shape: 'circle' },
    { id: 'b3', text: 'Thỉnh thoảng tôi không thể hiện, biểu lộ đúng như con người của tôi', shape: 'rectangle' },
    { id: 'b4', text: 'Tôi ra quyết định nhanh và quyết đoán', shape: 'triangle' },
    { id: 'b5', text: 'Tôi rất bừa bộn', shape: 'squiggle' },
    { id: 'b6', text: 'Tôi thích thiết lập quy tắc, thời khóa biểu', shape: 'square' },
    { id: 'b7', text: 'Tôi thích trang trí nhà cửa và nơi làm việc của tôi bằng cây xanh và tranh ảnh', shape: 'circle' },
    { id: 'b8', text: 'Ở thời điểm này, tôi đang nghĩ nhiều đến những hướng đi mới cho bản thân', shape: 'rectangle' },
    { id: 'b9', text: 'Tôi làm việc hết mình và chơi hết mình', shape: 'triangle' },
    { id: 'b10', text: 'Khi có xung đột, tôi sẽ rút lui trước hoặc luôn cố tránh xung đột nếu có thể', shape: 'circle' },
    { id: 'b11', text: 'Tôi thường tranh cãi quyết liệt', shape: 'triangle' },
    { id: 'b12', text: 'Tôi thích sưu tầm đồ vật', shape: 'square' },
    { id: 'b13', text: 'Tôi thích kết giao, cộng tác với những người quan trọng', shape: 'triangle' },
    { id: 'b14', text: 'Tôi thích ở nhà nghỉ ngơi, thư giãn cùng gia đình', shape: 'circle' },
    { id: 'b15', text: 'Tôi thích những sự bất ngờ', shape: 'squiggle' },
    { id: 'b16', text: 'Tôi thường mau chán', shape: 'squiggle' },
    { id: 'b17', text: 'Hiện nay tôi đang trải nghiệm một số thay đổi trong cược đời mình', shape: 'rectangle' },
    { id: 'b18', text: 'Tôi thường thay đổi ý nghĩ như chong chóng', shape: 'rectangle' },
    { id: 'b19', text: 'Tâm trạng của tôi thay đổi theo ngày', shape: 'rectangle' },
    { id: 'b20', text: 'Tôi chỉ sử dụng hàng cao cấp, thượng hạng mà thôi', shape: 'triangle' },
    { id: 'b21', text: 'Tôi sợ làm người khác mất lòng nên thường không dám nói và cố gắng tránh đụng chạm', shape: 'circle' },
    { id: 'b22', text: 'Tôi khá trầm lặng và thích riêng tư', shape: 'square' },
    { id: 'b23', text: 'Tôi thường nói nhanh, bộc phát và dùng nhiều điệu bộ, cử chỉ khi nói', shape: 'squiggle' },
    { id: 'b24', text: 'Tôi nói chuyện tự tin và dễ dàng trước công chúng', shape: 'triangle' },
    { id: 'b25', text: 'Tôi thường nghĩ đến lợi ích của người khác', shape: 'circle' },
    { id: 'b26', text: 'Ngăn bàn và tủ quần áo của tôi luôn gọn gàng, ngăn nắp', shape: 'square' },
    { id: 'b27', text: 'Tôi luôn hoàn tất công việc đúng thời hạn', shape: 'square' }
  ],
  C: [
    { id: 'c1', text: 'Mọi người thường làm tôi lúng túng bối rối', shape: 'rectangle' },
    { id: 'c2', text: 'Tôi cố gắng tìm những người hiểu được các khó khăn của tôi', shape: 'rectangle' },
    { id: 'c3', text: 'Tôi thích kiểm soát và chịu trách nhiệm', shape: 'triangle' },
    { id: 'c4', text: 'Trong giao tiếp, tôi thích nói hơn lắng nghe', shape: 'squiggle' },
    { id: 'c5', text: 'Tôi đối xử với đồng nghiệp và bạn bè như người thân trong gia đình', shape: 'circle' },
    { id: 'c6', text: 'Tôi thích làm việc theo nhóm', shape: 'circle' },
    { id: 'c7', text: 'Tôi luôn suy nghĩ kĩ trước khi nói', shape: 'square' },
    { id: 'c8', text: 'Tôi không thích hứa hẹn hoặc cam kết điều gì', shape: 'rectangle' },
    { id: 'c9', text: 'Tôi thích làm việc một mình', shape: 'square' },
    { id: 'c10', text: 'Tôi là một người giỏi xã giao', shape: 'circle' },
    { id: 'c11', text: 'Tôi là một người bạn rất trung thành', shape: 'square' },
    { id: 'c12', text: 'Thỉnh thoảng tôi chinh phục người khác bằng đam mê và nhiệt huyết của tôi', shape: 'squiggle' },
    { id: 'c13', text: 'Tôi không e ngại nói thẳng ra những chủ kiến của mình', shape: 'triangle' },
    { id: 'c14', text: 'Tôi dễ dàng thay đổi trong mối quan hệ của mình', shape: 'squiggle' },
    { id: 'c15', text: 'Nếu bạn cần, tôi sẽ hết lòng giúp bạn', shape: 'circle' },
    { id: 'c16', text: 'Tôi ghét rơi vào những tình huống bị mọi người quá chú ý, dòm ngó', shape: 'square' },
    { id: 'c17', text: 'Tôi là tấm gương cho nhiều người', shape: 'triangle' },
    { id: 'c18', text: 'Tôi thích chỉ đạo hoặc giao việc cho người khác làm', shape: 'triangle' },
    { id: 'c19', text: 'Tôi nghĩ gì nói đấy', shape: 'squiggle' },
    { id: 'c20', text: 'Tôi giỏi truyền cảm hứng cho người khác', shape: 'squiggle' },
    { id: 'c21', text: 'Lúc này tôi đang cần một người hướng dẫn, cố vấn cho tôi', shape: 'rectangle' },
    { id: 'c22', text: 'Tôi thích nói chuyện và chia sẻ với mọi người', shape: 'circle' },
    { id: 'c23', text: 'Tôi rất kiên định, một khi đã quyết định thì tôi sẽ theo đuổi đến cùng', shape: 'square' },
    { id: 'c24', text: 'Tôi hay mất kiên nhẫn và thường ngắt lời người khác', shape: 'triangle' },
    { id: 'c25', text: 'Tôi không thích thể hiện tình cảm trước đám đông', shape: 'square' },
    { id: 'c26', text: 'Tôi biết tận dụng tình thế, mối quan hệ để đạt được mục tiêu của mình', shape: 'triangle' },
    { id: 'c27', text: 'Thỉnh thoảng tôi cảm thấy như mình bị lợi dụng', shape: 'circle' }
  ]
};

// --- DỮ LIỆU KẾT QUẢ TÍNH CÁCH (Lấy từ file Doc) ---
const resultDescriptions = {
  square: {
    name: "HÌNH VUÔNG",
    quote: "“Tốt nhất là tự mình làm lấy mọi chuyện”",
    desc: "Hình Vuông tôn sùng tính tổ chức, ngăn nắp, trật tự. Niềm tin của bạn là: 'Bàn làm việc có gọn gàng ngăn nắp thì đầu óc mới làm việc sáng suốt được'. Bạn tỉ mỉ, chăm chút đến từng chi tiết và thích các số liệu cụ thể. Bạn rất chăm chỉ, đáng tin cậy. Khi đã hứa, bạn thực hiện bằng bất cứ giá nào. Bạn thích làm việc độc lập, kiên định và nhẫn nại. Tuy nhiên, bạn rất khó chấp nhận một sự thay đổi đột ngột.",
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-600"
  },
  triangle: {
    name: "HÌNH TAM GIÁC",
    quote: "“Đừng bao giờ để người khác thấy bạn đang lo sợ”",
    desc: "Hình Tam Giác thể hiện tố chất lãnh đạo rõ nhất. Bạn rất quyết đoán, tự tin và luôn muốn mọi thứ nằm trong tầm kiểm soát. Bạn có tính cạnh tranh cao và luôn hướng tới mục tiêu chiến thắng. Bạn không thích sự trì hoãn, quyết định rất nhanh và đi thẳng vào vấn đề. Điểm nổi bật nhất của bạn là khả năng tập trung cao độ, 'làm hết sức, chơi hết mình'.",
    color: "text-red-600",
    bg: "bg-red-100",
    border: "border-red-600"
  },
  circle: {
    name: "HÌNH TRÒN",
    quote: "“Gian nan mới biết bạn hiền”",
    desc: "Hình Tròn là biểu tượng của sự hài hòa. Bạn là người thân thiện, dễ gần, là 'người của mọi người'. Bạn có khả năng lắng nghe và cảm thông sâu sắc với nỗi đau của người khác. Bạn ghét mâu thuẫn, xung đột và thường là người nhượng bộ, làm hòa trước để giữ gìn các mối quan hệ. Trong tập thể, bạn là chất keo kết nối, giỏi khích lệ và mang lại niềm vui cho mọi người.",
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-600"
  },
  squiggle: {
    name: "HÌNH LƯỢN SÓNG",
    quote: "“Cuộc sống ngắn ngủi lắm, hãy tận hưởng niềm vui đi bạn”",
    desc: "Hình Lượn Sóng đại diện cho nhóm người yêu tự do và cực kỳ sáng tạo. Bạn xử lý thông tin bằng trực giác, liên tục nghĩ ra ý tưởng mới và không thích sự gò bó, chi tiết. Bạn có tư tưởng cầu tiến, say mê với cái mới. Bạn luôn nói thẳng, nói thật, tràn đầy năng lượng, có khiếu hài hước. Dù thỉnh thoảng hơi bừa bộn và 'bốc đồng', bạn luôn là tâm điểm truyền cảm hứng cho mọi người.",
    color: "text-purple-600",
    bg: "bg-purple-100",
    border: "border-purple-600"
  },
  rectangle: {
    name: "HÌNH CHỮ NHẬT",
    quote: "“Giai đoạn của sự thay đổi và phát triển”",
    desc: "Hình Chữ Nhật đại diện cho một giai đoạn chuyển giao. Bạn đang cảm thấy có sự thôi thúc thay đổi trong công việc hoặc cuộc sống. Nét nổi bật của bạn lúc này là tâm trạng khá thất thường, đang trong giai đoạn mất cân bằng nhưng lại khao khát khám phá hướng đi mới. Đây là lúc bạn học hỏi được nhiều nhất, dám thử những điều chưa từng làm. Đừng lo lắng, đây chỉ là giai đoạn tạm thời để bạn vươn lên.",
    color: "text-orange-600",
    bg: "bg-orange-100",
    border: "border-orange-600"
  }
};

// --- CÁC COMPONENT SVG ĐỂ VẼ HÌNH ---
const ShapeIcon = ({ shape, className = "w-6 h-6" }) => {
  switch (shape) {
    case 'square':
      return (
        <svg className={`${className} text-blue-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        </svg>
      );
    case 'triangle':
      return (
        <svg className={`${className} text-red-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        </svg>
      );
    case 'circle':
      return (
        <svg className={`${className} text-green-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      );
    case 'rectangle':
      return (
        <svg className={`${className} text-orange-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        </svg>
      );
    case 'squiggle':
      return (
        <svg className={`${className} text-purple-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12c3-3 6-3 9 0s6 3 9 0"></path>
          <path d="M3 17c3-3 6-3 9 0s6 3 9 0"></path>
          <path d="M3 7c3-3 6-3 9 0s6 3 9 0"></path>
        </svg>
      );
    default:
      return null;
  }
};


export default function App() {
  const [selections, setSelections] = useState({ A: [], B: [], C: [] });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  // Xử lý khi click vào ô cào
  const toggleSelection = (section, item) => {
    if (isSubmitted) return; // Không cho sửa khi đã nộp

    setSelections(prev => {
      const currentSectionSelected = prev[section];
      const isAlreadySelected = currentSectionSelected.some(sel => sel.id === item.id);

      if (isAlreadySelected) {
        // Bỏ chọn
        return {
          ...prev,
          [section]: currentSectionSelected.filter(sel => sel.id !== item.id)
        };
      } else {
        // Kiểm tra giới hạn 7 câu mỗi phần
        if (currentSectionSelected.length >= 7) {
          alert(`Bạn đã chọn đủ 7 câu ở Phần ${section}. Vui lòng bỏ chọn một câu trước khi chọn câu mới.`);
          return prev;
        }
        // Thêm lựa chọn
        return {
          ...prev,
          [section]: [...currentSectionSelected, item]
        };
      }
    });
  };

  // Xử lý nộp bài
  const handleSubmit = () => {
    // Kiểm tra xem đã chọn đủ chưa
    if (selections.A.length < 7 || selections.B.length < 7 || selections.C.length < 7) {
      const confirmSubmit = window.confirm(
        `Bạn chưa chọn đủ 7 câu cho mỗi phần!\nPhần A: ${selections.A.length}/7\nPhần B: ${selections.B.length}/7\nPhần C: ${selections.C.length}/7\n\nBạn có chắc chắn muốn xem kết quả luôn không?`
      );
      if (!confirmSubmit) return;
    }

    // Tính toán kết quả
    const allSelected = [...selections.A, ...selections.B, ...selections.C];
    const tallies = {
      square: 0,
      triangle: 0,
      circle: 0,
      squiggle: 0,
      rectangle: 0
    };

    allSelected.forEach(item => {
      tallies[item.shape]++;
    });

    // Tìm hình có điểm cao nhất
    let maxShape = '';
    let maxScore = -1;
    for (const [shape, score] of Object.entries(tallies)) {
      if (score > maxScore) {
        maxScore = score;
        maxShape = shape;
      }
    }

    setResults({ tallies, dominant: maxShape });
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tính số lượng đã chọn
  const getProgress = (section) => `${selections[section].length}/7`;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Psycho-Geometrics®</h1>
            <p className="text-sm text-gray-500 italic">Tâm lý - Hình học</p>
          </div>
          {isSubmitted && (
             <button 
             onClick={() => {
               setSelections({ A: [], B: [], C: [] });
               setIsSubmitted(false);
               setResults(null);
             }}
             className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
           >
             Làm lại bài
           </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-6">
        {/* Phần Hướng dẫn */}
        {!isSubmitted && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase">Hướng dẫn làm bài trắc nghiệm</h2>
            <p className="mb-4">
              Bài trắc nghiệm này giúp bạn xác định tính cách của mình qua các biểu tượng hình học. 
              Hiểu bản thân là bước đầu tiên và quan trọng giúp bạn hiểu người khác để giao tiếp hiệu quả hơn.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold">Cách làm bài:</p>
                <p>Bài có 3 phần (A, B, C). Trong mỗi phần, hãy chọn <strong>đúng 7 câu hay cụm từ</strong> mô tả về bạn rõ nét nhất. Hãy bấm vào "lớp tráng bạc" bên cạnh mỗi câu để lật mở hình học bí ẩn phía dưới nhé!</p>
              </div>
            </div>
          </div>
        )}

        {/* Màn hình kết quả */}
        {isSubmitted && results && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
            <div className={`p-8 text-center text-white bg-gradient-to-r from-gray-700 to-gray-900`}>
              <h2 className="text-3xl font-bold mb-2">KẾT QUẢ CỦA BẠN</h2>
              <p className="text-gray-200">Dựa trên những lựa chọn của bạn, tính cách nổi trội nhất là:</p>
            </div>
            
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center ${resultDescriptions[results.dominant].bg} border-4 ${resultDescriptions[results.dominant].border}`}>
                  <ShapeIcon shape={results.dominant} className={`w-20 h-20`} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className={`text-3xl font-black mb-2 ${resultDescriptions[results.dominant].color}`}>
                    {resultDescriptions[results.dominant].name}
                  </h3>
                  <p className="text-xl italic text-gray-600 font-serif mb-4">
                    {resultDescriptions[results.dominant].quote}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {resultDescriptions[results.dominant].desc}
                  </p>
                </div>
              </div>

              {/* Bảng điểm chi tiết */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-bold mb-6 text-center text-gray-500 uppercase tracking-wider">Phân bổ các nét tính cách</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.keys(results.tallies).map(shapeKey => (
                    <div key={shapeKey} className={`flex flex-col items-center p-4 rounded-lg border ${results.dominant === shapeKey ? 'border-gray-400 bg-gray-50' : 'border-gray-100'}`}>
                      <ShapeIcon shape={shapeKey} className="w-8 h-8 mb-2" />
                      <span className="text-sm text-gray-500 uppercase">{resultDescriptions[shapeKey].name.replace('HÌNH ', '')}</span>
                      <span className="text-2xl font-bold mt-1">{results.tallies[shapeKey]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Các phần trắc nghiệm */}
        <div className={isSubmitted ? "opacity-50 pointer-events-none" : ""}>
          {/* Phần A */}
          <section className="mb-10">
            <div className="flex justify-between items-end border-b-2 border-gray-800 pb-2 mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                A. CÁC NÉT TÍNH CÁCH CỦA BẠN
              </h3>
              <span className={`font-bold px-3 py-1 rounded-full text-sm ${selections.A.length === 7 ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                Đã chọn: {getProgress('A')}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {testData.A.map((item) => {
                const isSelected = selections.A.some(sel => sel.id === item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleSelection('A', item)}
                    className={`flex items-center text-left p-3 rounded-lg border transition-all duration-300 w-full
                      ${isSelected ? `bg-white border-blue-400 shadow-md` : `bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50`}
                    `}
                  >
                    {/* Ô "Tráng Bạc" */}
                    <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded transition-all duration-500 
                      ${isSelected ? 'bg-white' : 'bg-slate-300 border-2 border-slate-400 shadow-inner'}`}
                    >
                      {isSelected ? (
                        <ShapeIcon shape={item.shape} className="w-8 h-8 animate-pulse" />
                      ) : (
                        <div className="w-full h-full opacity-30 flex items-center justify-center">
                           {/* Họa tiết nhiễu giả lập lớp bạc */}
                           <svg width="100%" height="100%">
                              <filter id="noise">
                                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
                              </filter>
                              <rect width="100%" height="100%" filter="url(#noise)" fill="none" opacity="0.3"/>
                           </svg>
                        </div>
                      )}
                    </div>
                    <span className={`ml-4 text-sm ${isSelected ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {item.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Phần B */}
          <section className="mb-10">
            <div className="flex justify-between items-end border-b-2 border-gray-800 pb-2 mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                B. HÀNH VI CỦA BẠN
              </h3>
              <span className={`font-bold px-3 py-1 rounded-full text-sm ${selections.B.length === 7 ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                Đã chọn: {getProgress('B')}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {testData.B.map((item) => {
                const isSelected = selections.B.some(sel => sel.id === item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleSelection('B', item)}
                    className={`flex items-center text-left p-3 rounded-lg border transition-all duration-300 w-full
                      ${isSelected ? `bg-white border-blue-400 shadow-md` : `bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50`}
                    `}
                  >
                    <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded transition-all duration-500 
                      ${isSelected ? 'bg-white' : 'bg-slate-300 border-2 border-slate-400 shadow-inner'}`}
                    >
                      {isSelected ? <ShapeIcon shape={item.shape} className="w-8 h-8 animate-pulse" /> : (
                         <div className="w-full h-full opacity-30 flex items-center justify-center">
                          <svg width="100%" height="100%">
                            <rect width="100%" height="100%" filter="url(#noise)" fill="none" opacity="0.3"/>
                          </svg>
                         </div>
                      )}
                    </div>
                    <span className={`ml-4 text-sm ${isSelected ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {item.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Phần C */}
          <section className="mb-10">
            <div className="flex justify-between items-end border-b-2 border-gray-800 pb-2 mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                C. TƯƠNG QUAN VỚI MỌI NGƯỜI
              </h3>
              <span className={`font-bold px-3 py-1 rounded-full text-sm ${selections.C.length === 7 ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                Đã chọn: {getProgress('C')}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {testData.C.map((item) => {
                const isSelected = selections.C.some(sel => sel.id === item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleSelection('C', item)}
                    className={`flex items-center text-left p-3 rounded-lg border transition-all duration-300 w-full
                      ${isSelected ? `bg-white border-blue-400 shadow-md` : `bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50`}
                    `}
                  >
                    <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded transition-all duration-500 
                      ${isSelected ? 'bg-white' : 'bg-slate-300 border-2 border-slate-400 shadow-inner'}`}
                    >
                      {isSelected ? <ShapeIcon shape={item.shape} className="w-8 h-8 animate-pulse" /> : (
                         <div className="w-full h-full opacity-30 flex items-center justify-center">
                          <svg width="100%" height="100%">
                            <rect width="100%" height="100%" filter="url(#noise)" fill="none" opacity="0.3"/>
                          </svg>
                         </div>
                      )}
                    </div>
                    <span className={`ml-4 text-sm ${isSelected ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {item.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Nút Submit */}
        {!isSubmitted && (
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-20">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600 font-medium">
                Tiến độ: 
                <span className="ml-2 px-2 border-r border-gray-300">A: {getProgress('A')}</span>
                <span className="px-2 border-r border-gray-300">B: {getProgress('B')}</span>
                <span className="px-2">C: {getProgress('C')}</span>
              </div>
              <button 
                onClick={handleSubmit}
                className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-bold shadow-md transition-colors"
              >
                XEM KẾT QUẢ
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
