import { useState, useRef, useEffect } from 'react';
import {
  // MessageBox,
  // SystemMessage,
  Input,
  // ChatList,
  Navbar,
  Avatar,
  Button,
  MessageList,
  ChatItem,
} from 'react-chat-elements';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
// import convertWebmToMp3 from './converter';

function App() {
  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chattext, setChatText] = useState('');
  const chatCoverRef = useRef(null);
  const inputRef = useRef(null);
  const playerRef = useRef(null);
  const recorderControls = useAudioRecorder();
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = recorderControls;

  const handleSend = (e) => {
    const dt = {
      position: 'right',
      type: 'text',
      text: chattext,
      date: new Date(),
      replyButton: true,
    };
    setMessages((prev) => [...prev, dt]);
    setChatText('');
    inputRef.current.value = '';
  };

  const addAudioElement = async (blob) => {
    const url = URL.createObjectURL(blob);
    // playerRef.current.src = url;
    console.log(recordingBlob);
    // const newB = await convertWebmToMp3(url);
    // console.log(newB);
    // const audio = document.createElement('audio');
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
    const dt = {
      position: 'right',
      type: 'audio',
      data: {
        audioURL: url,
        audioType: 'audio/webm',
        status: {
          click: true,
          loading: 0.5,
          download: true,
        },
      },
      date: new Date(),
      replyButton: true,
    };
    setMessages((prev) => [...prev, dt]);
  };

  useEffect(() => {
    // setMessages([
    //   {
    //     position: 'left',
    //     type: 'text',
    //     avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
    //     text: 'Give me a message list example !',
    //     title: 'Dave',
    //     date: new Date('12/1/2023'),
    //   },
    //   {
    //     position: 'left',
    //     type: 'photo',
    //     data: { uri: 'https://picsum.photos/200/200' },
    //   },
    //   {
    //     position: 'left',
    //     type: 'text',
    //     text: 'Give me a message list example !',
    //   },
    //   {
    //     position: 'left',
    //     type: 'text',
    //     text: 'Give me a message list example !',
    //   },
    //   {
    //     position: 'right',
    //     type: 'text',
    //     text: "That's all.",
    //   },
    //   {
    //     // position: 'right',
    //     type: 'system',
    //     text: 'MONDAY',
    //     replyButton: true,
    //   },
    //   {
    //     position: 'right',
    //     type: 'text',
    //     text: "That's all.",
    //   },
    //   {
    //     position: 'right',
    //     type: 'video',
    //     data: {
    //       videoURL:
    //         'https://www.sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4',
    //       status: {
    //         click: true,
    //         loading: 0.5,
    //         download: true,
    //       },
    //     },
    //   },
    //   {
    //     position: 'right',
    //     type: 'text',
    //     text: "That's all.",
    //     reply: {
    //       title: 'Emre',
    //       titleColor: '#8717ae',
    //       message: 'Nice to meet you',
    //     },
    //   },
    //   {
    //     position: 'right',
    //     type: 'file',
    //     text: "That's all.",
    //     data: {
    //       uri: 'https://www.sample-videos.com/pdf/Sample-pdf-5mb.pdf',
    //       status: {
    //         click: false,
    //         loading: 0,
    //       },
    //       extension: 'docx',
    //     },
    //     onOpen: (e) => console.log(e),
    //     date: new Date(),
    //     replyButton: true,
    //   },
    // ]);
  }, []);

  useEffect(() => {
    // console.log(chatCoverRef.current?.lastChild);
    chatCoverRef.current?.lastChild?.scrollIntoView();
  });
  const showRecordBtn = chattext.length > 0 ? false : true;
  return (
    <div className="w-screen h-screen bg-slate-200">
      <div className="container bg-white flex flex-col md:flex-row overflow-hidden h-screen mx-auto">
        <div
          className={`flex-col relative overflow-hidden md:max-w-[25rem] w-full h-full ${
            !openChat ? 'flex' : 'hidden md:flex'
          }`}
        >
          <div className="absolute w-full flex flex-col overflow-hidden top-0 z-20">
            <Navbar
              left={
                <Avatar
                  src="https://avatars.githubusercontent.com/u/80540635?v=4"
                  alt="avatar"
                  size="small"
                  type="circle"
                />
              }
              right={
                <div className="px-3 text-lg font-bold cursor-pointer hover:bg-gray-300">
                  :
                </div>
              }
              type="light"
              className="bg-white border"
            />
            <Input
              placeholder="Type here..."
              multiline={false}
              className="border px-3 my-2 bg-red-300"
            />
          </div>
          <div className="overflow-y-scroll mt-28 no-scrollbar">
            {'12345'.split('').map((d) => (
              <ChatItem
                key={d}
                avatar="https://avatars.githubusercontent.com/u/41473129?v=4"
                alt="kursat_avatar"
                title="Emre"
                subtitle="What are you doing ?"
                date={new Date()}
                statusColor={'green'}
                statusColorType="encircle"
                muted={true}
                showMute={true}
                showVideoCall={true}
                unread={2}
                onClick={(e) => {
                  setOpenChat(true);
                }}
                onContextMenu={() => {
                  alert('cmenu');
                }}
              />
            ))}
          </div>
        </div>
        <div
          className={`flex flex-col relative overflow-hidden w-full h-full ${
            openChat ? 'flex' : 'hidden md:flex'
          }`}
        >
          <div className="w-full overflow-hidden absolute top-0 z-10">
            <Navbar
              left={
                <>
                  <div
                    onClick={() => setOpenChat(false)}
                    className="px-3 backbtn text-lg font-bold cursor-pointer hover:bg-gray-300"
                  >
                    &lt;
                  </div>
                  <div>
                    <Avatar
                      src="https://avatars.githubusercontent.com/u/41473129?v=4"
                      alt="avatar"
                      size="small"
                      type="circle"
                      // className="rounded-full overflow-hidden"
                    />
                  </div>
                </>
              }
              right={
                <div className="px-3 text-lg font-bold cursor-pointer hover:bg-gray-300">
                  :
                </div>
              }
              type="light"
              className="border"
            />
          </div>

          <div
            className="w-full h-full overflow-y-scroll bg-blue-200 no-scrollbar py-16"
            // ref={chatCoverRef}
            // style={{ height: 'calc(100vh - 3rem)' }}
          >
            <MessageList
              referance={chatCoverRef}
              className="message-list"
              // lockable={true}
              toBottomHeight={'100%'}
              dataSource={messages}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-2 overflow-hidden bg-slate-200 absolute bottom-0 z-10 p-2">
            <div
              className="flex-1 border"
              //  style={{ width: 'calc(100% - 15px)' }}
            >
              <Input
                placeholder="Type here..."
                multiline={false}
                referance={inputRef}
                className="h-full rounded"
                inputStyle={{
                  overflow: 'hidden',
                  height: isRecording ? '0' : '',
                }}
                onChange={(e) => setChatText(e.target.value)}
                value={chattext}
                leftButtons={
                  <>
                    {/* <audio
                      ref={playerRef}
                      src={''}
                      // className={recordingBlob ? 'flex hidden' : 'hidden'}
                      className="hidden"
                      controls
                    /> */}
                  </>
                }
                // type="file"
                rightButtons={
                  <div className="float-right">
                    <AudioRecorder
                      onRecordingComplete={addAudioElement}
                      recorderControls={recorderControls}
                      audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                      }}
                      // downloadOnSavePress={true}
                      downloadFileExtension="wav"
                      showVisualizer={true}
                      classes={{
                        AudioRecorderClass: isRecording
                          ? 'forced-row-rev w-full'
                          : 'fhidden',
                        // AudioRecorderPauseResumeClass: 'hidden',
                        AudioRecorderStartSaveClass: 'hidden',
                        AudioRecorderDiscardClass: 'hidden',
                      }}
                    />
                    {!showRecordBtn ? (
                      <button
                        className="w-10 h-10 mx-2 pr-2 pl-0 rounded-full flex justify-center items-center bg-green-600"
                        onClick={handleSend}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fff"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          id="send-btn-icon"
                          className="rotate-45"
                        >
                          <line x1={22} y1={2} x2={11} y2={13} />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        className={`w-10 h-10 mx-2 px-2 rounded-full flex justify-center items-center bg-green-600 ${
                          isRecording && 'animate-pulse'
                        }`}
                        onClick={() => {
                          if (recorderControls.isRecording) {
                            recorderControls.stopRecording();
                            return;
                          }
                          recorderControls.startRecording();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-mic"
                        >
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          <line x1={12} y1={19} x2={12} y2={23} />
                          <line x1={8} y1={23} x2={16} y2={23} />
                        </svg>
                      </button>
                    )}
                  </div>
                }
                onKeyPress={(e) => {
                  if (e.key == 'Enter') {
                    handleSend(e);
                  }
                }}
                clear={(d) => {
                  console.log(d);
                }}
                // onSubmit={(e) => handleSend(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
