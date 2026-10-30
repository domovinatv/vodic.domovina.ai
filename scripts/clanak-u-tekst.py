# Tekst članka iz spremljenog HTML-a baze znanja support.certilia.com.
#   python3 -I scripts/clanak-u-tekst.py <clanak.html>
import re,html,sys
t=open(sys.argv[1],encoding='utf-8',errors='ignore').read()
m=re.search(r'<article.*?</article>',t,re.S) or re.search(r'class="[^"]*entry-content.*',t,re.S)
t=m.group(0) if m else t
imgs=re.findall(r'<img[^>]+src="([^"]+)"',t); vids=re.findall(r'(?:youtube\.com/[^"\' ]+|youtu\.be/[^"\' ]+)',t)
t=re.sub(r'<script.*?</script>|<style.*?</style>','',t,flags=re.S)
s=re.sub(r'\s+',' ',html.unescape(re.sub('<[^>]+>',' ',t))).strip()
print(s[:1800]); print('IMG',len(imgs),'VID',vids[:3])
