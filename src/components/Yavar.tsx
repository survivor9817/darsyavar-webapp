const Yavar = () => {
  return (
    <>
      <div id="YavarTabContainer" className="tab-container">
        <div className="yavar-container">
          <div className="chat-container">
            <div className="messages-container">
              <div className="welcome-massage">
                <img
                  className="yavar-character float-animation"
                  src="../imgs/darsyavar0-nobg.png"
                  alt=""
                />
                <div className="greeting-message">
                  در خدمتم رضا جان <br />
                  هر سوال درسی یا مشاوره‌ای داشتی <br />
                  می‌تونی از من بپرسی 🤗
                </div>
              </div>
            </div>
            <div className="chat-input-container">
              <textarea
                className="chat-input"
                name="input-message"
                id="chatInput"
                placeholder="سؤالت رو اینجا بنویس..."
              ></textarea>
              <button className="send-btn" id="sendButton">
                <i className="msr"> arrow_circle_up </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Yavar;
