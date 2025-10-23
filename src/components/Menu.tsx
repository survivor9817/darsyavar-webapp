import CloseBtn from "./CloseBtn";

type Props = {
  style: {};
  onClose: () => void;
};

const Menu = ({ style, onClose }: Props) => {
  return (
    <>
      <div className="sidebar sidebar-left" style={style}>
        <CloseBtn onClick={onClose} />

        <div className="menu-section">
          <img src="./imgs/reza.jpg" alt="user-img" className="user-img" />
          <div className="user-name">رضا قزلسفلو</div>
          <span className="user-role">معلم مدرسه</span>
          <div className="divider"></div>
          <ul className="menu-items-container">
            <li className="menu-item">صفحه کاربری</li>
            <li className="menu-item">خرید جدید</li>
            <li className="menu-item">تمرین‌های قبلی</li>
            <li className="menu-item">طراحی امتحان</li>
            <li className="menu-item">اضافه کردن سؤال</li>
            <li className="menu-item">تنظیمات</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Menu;
