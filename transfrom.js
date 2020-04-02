const fs = require('fs');

/* 
####_1_####
@name: geojson_to_geojson
@params: {
  fromdata: geojson对象
}
@desc： 将一个geojson数据 进行转换，主要是转换值类型，增加值。
*/
const geojson_to_geojson = (fromdata) =>{
  let itemArr = fromdata.features.map(item => (
    {
      ...item,
      properties:{
        ...item.properties,
        //下面是要修改的属性
        height: parseInt(item.properties.code),
      },
      geometry:{
        ...item.geometry,
        //下面是要修改的属性
        type: item.geometry.type,
        coordinates: item.geometry.coordinates
      }
    }
  ));

  let temp = {
    ...fromdata,
    features: [
      ...itemArr
    ]
  }

  return temp;
}


//最后执行的方法，方法调用也在里面
function go_init(){
  fs.readFile('./from.json','utf8',(err,data)=>{
    if (err) throw err;
    let result = geojson_to_geojson(JSON.parse(data.toString()))
    fs.writeFile('./to.json', JSON.stringify(result, null, 2), 'utf-8', err=>{
      if(err) throw err;
    })
  })
}


go_init();