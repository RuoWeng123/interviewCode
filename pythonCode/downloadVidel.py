import requests
import youtube_dl

def download_video(video_url, output_path='./downloaded_video.mp4'):
    # 获取视频的直接链接
    response = requests.get(video_url)
    
    if response.status_code == 200:
        # 获取视频直接链接
        direct_url = response.text.strip()
        
        # 使用youtube_dl下载视频
        ydl_opts = {'outtmpl': output_path}
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([direct_url])

        print("视频下载完成！")
    else:
        print("无法获取视频链接。")


url = 'https://cn.pornhub.com/view_video.php?viewkey=ph621265a51ec3a'
download_video(url)