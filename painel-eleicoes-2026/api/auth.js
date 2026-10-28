module.exports = async (req, res) => {
  res.setHeader('X-Robots-Tag','noindex,nofollow,noarchive');
  res.setHeader('Cache-Control','no-store');
  res.setHeader('Content-Type','application/json; charset=utf-8');
  if(req.method!=='POST'){
    res.statusCode=405;
    return res.end(JSON.stringify({error:'method'}));
  }
  let body=req.body||{};
  if(typeof body==='string'){
    try{body=JSON.parse(body)}catch{body={}}
  }
  const expected=process.env.PANEL_PASSWORD||'';
  if(!expected){
    res.statusCode=503;
    return res.end(JSON.stringify({error:'auth_not_configured'}));
  }
  if(String(body.password||'')!==expected){
    res.statusCode=401;
    return res.end(JSON.stringify({error:'unauthorized'}));
  }
  res.statusCode=200;
  return res.end(JSON.stringify({ok:true}));
};