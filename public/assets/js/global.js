function CallAfterFileUpload(data){
    if(data.form != undefined){
        var n = data.result.files[0].name.lastIndexOf('.');
        var res = data.result.files[0].name.substring(n + 1);
        data.result.files[0].extension= res;


        var id = data.form[0].id;
        var tmp3 = id.split('-');

        if(data.result.files[0].extension == "png" || data.result.files[0].extension == "jpeg" || data.result.files[0].extension == "jpg" || data.result.files[0].extension == "gif"){
            $("#"+tmp3[0]+"-"+tmp3[1]).prepend("<img src='"+data.result.files[0].url+"' id='"+tmp3[0]+"-"+tmp3[1]+"-test' style='width:100%;display:none;' />");
        }else{
            $("#"+tmp3[0]+"-"+tmp3[1]).prepend("<a href='"+data.result.files[0].url+"' id='"+tmp3[0]+"-"+tmp3[1]+"-test' style='width:100%;display:none;'><img src='/netmessage/public/assets/img/"+data.result.files[0].extension+".png' width='60px'  /></a>");

        }
        $("#"+id).remove();
        if($("#"+tmp3[0]+"-"+tmp3[1]+"-test").parent().is( "div" )){
            $("#"+tmp3[0]+"-"+tmp3[1]+"-test").unwrap();
        }
        $("#"+tmp3[0]+"-"+tmp3[1]+"-test").attr("id",tmp3[0]+"-"+tmp3[1]);
        $("#"+tmp3[0]+"-"+tmp3[1]).show();
    }

}
/******************************* Evenement Drop pour les Composants (impriqué)**************************************************************/
function LoadSortableElements(){
    $( ".sortableElement" ).sortable({
        revert: true,
        start : function(event, ui) {
        },
        stop: function(event, ui) {
            if(event.handleObj.namespace == "draggable"){

                if(type == "image"){
                    ui.item.replaceWith("<div class='sortableElement ui-sortable' id='image-"+count+"' style='float:left;width:100%;text-align: center;border: 2px dashed #ff5722;padding: 6px;background-color: rgba(255,87,34,.6);'><form id='image-"+count+"-form'   class='dragImgTemplate' action='//jquery-file-upload.appspot.com/' method='POST' enctype='multipart/form-data'><div class='dropzone2'   ><div class='mo-uploadzone' style='position: relative;  border: 2px dotted #808080; text-align: center;'><input class='fileupload' type='file' multiple='' name='files[]' style='z-index: 10;position: absolute;top: 0;left: 0;right: 0;bottom: 0;min-width: 100%;height: 100%;font-zie: 999px;text-align: right;filter: alpha(opacity=0);opacity: 0;outline: none;cursor: inherit;display: block;' title=' '><span class='uploadzone uploadzoneImg' >Click or drag file here</span></div></div></form></div>");
                    modifs.push("image-"+count);
                    count++;

                    var head= document.getElementsByTagName('head')[0];
                    var script= document.createElement('script');
                    script.type= 'text/javascript';
                    script.src= '/netmessage/public/assets/js/fileUpload/mainUploadFileComposant.js';

                    if(head.lastChild.src != "http://localhost/netmessage/public/assets/js/fileUpload/mainUploadFileComposant.js")
                        head.appendChild(script);
                    $('.dragImgTemplate').each(function (i,e) {
                        var selector = $(this);
                        //
                        $(this).fileupload({
                            url: '/netmessage/public/server/php/',
                            dropZone: $(this),
                            autoUpload: true,
                            done : function(e, data){

                                CallAfterFileUpload(data);
                            }
                        });
                    });

                }else if(type == "document"){
                    ui.item.replaceWith('<a id="document-'+count+'" href="'+url+'"><img src="/netmessage/public/assets/img/'+extension+'.png" width="60px" /></a>');
                    modifs.push("document-"+count);
                    count++;
                }else if(type == "2titles"){
                    ui.item.replaceWith(' <table id="2title-'+count+'" width="100%" border="0" cellspacing="0" cellpadding="0">    <tr>        <td  contentEditable=true>    <h2 id="2title-h2-'+count+'" class="subhead" style="padding: 0 0 0 3px;">CREATING</h2>                </td>    </tr>    <tr>        <td >     <h1 id="2title-h1-'+count+'" class="h1" style="padding: 5px 0 0 0;" contentEditable=true>Responsive Email Magic</h1>    </td>    </tr></table>');
                    modifs.push("2title-"+count);
                    count++;
                }else if(type == "title+text"){
                    ui.item.replaceWith(' <table id="titletext-'+count+'" width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td ><h2 id="titletext-h2-'+count+'" class="h2" contentEditable=true>Welcome to our responsive email!</h2></td> </tr><tr> <td ><p id="titletext-p-'+count+'" class="bodycopy" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat.</p></td>            </tr>        </table>');
                    modifs.push("titletext-"+count);
                    count++;
                }else if(type == "text+button"){
                    ui.item.replaceWith('<table id="textbutton-'+count+'" width="100%" border="0" cellspacing="0" cellpadding="0"> <tr><td ><p id="textbutton-p-'+count+'" class="bodycopy" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat.</p></td></tr><tr><td style="padding: 10px 0 0 0;"> <table class="buttonwrapper"  border="0" cellspacing="0" cellpadding="0"><tr><td  ><a id="textbutton-a-'+count+'" href="#" class="button" contentEditable=true style="background-color: rgb(224, 84, 67);height:45px;">Button</a></td></tr></table></td></tr></table>');
                    modifs.push("textbutton-"+count);
                    count++;
                }else if(type == "imageReel"){

                    ui.item.replaceWith('<img src="'+url+'" id="imageReel-'+count+'" style="width:100%;" />');
                    modifs.push("imageReel-"+count);
                    count++;
                }else if(type == "title") {
                    ui.item.replaceWith('<table id="title-'+count+'" width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><h2 id="title-h2-'+count+'" class="h2" contenteditable="true">Welcome to our responsive email!</h2></td> </tr>  </></table>');
                    modifs.push("title-"+count);
                    count++;
                }else if(type == "text") {
                    ui.item.replaceWith('<table id="text-'+count+'" width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><p id="text-p-'+count+'"  class="bodycopy" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor.</p></td> </tr>  </></table>');
                    modifs.push("text-"+count);
                    count++;
                }else if(type == "button"){
                    ui.item.replaceWith('<table  id="button-'+count+'" class="buttonwrapper"  border="0" cellspacing="0" cellpadding="0"><tr><td>' +
                        '<a id="button-a-'+count+'" href="#" class="button" contentEditable=true style="background-color: rgb(224, 84, 67);height:45px;">Button</a>' +
                        '</td></tr></table>');
                    modifs.push("button-"+count);
                    count++;
                }else if(type == "separator"){

                    ui.item.replaceWith('<table id="separator-'+count+'" width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><hr id="separator-hr-'+count+'"></td> </tr>  </></table>');
                    modifs.push("separator-"+count);
                    count++;
                }else if(type == "espaceur"){
                    ui.item.replaceWith('<table id="espaceur-'+count+'" class="espaceur" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                        '<tr style="width: 100%; height: 50px;"><td></td></tr></table>');
                    modifs.push("espaceur-"+count);
                    count++;
                }else if(type == "share"){

                    ui.item.replaceWith('<table class="shareComposant" id="share-'+count+'" border="0" cellspacing="0" cellpadding="0">' +
                        '<tbody><tr><td  style="text-align: center; padding: 0 10px 0 10px;">' +
                        '<a id="share-'+count+'-facebook" href="#">' +
                        '<img width="37" height="37" src="http://localhost/netmessage/public/assets/img/facebook.png" alt=""></a></td>' +
                        '<td  style="text-align: center; padding: 0 10px 0 10px;">' +
                        '<a id="share-'+count+'-twitter" href="#">' +
                        '<img width="37" height="37" src="http://localhost/netmessage/public/assets/img/twitter.png" alt=""></a></td>' +
                        '<td  style="text-align: center; padding: 0 10px 0 10px;">' +
                        '<a  id="share-'+count+'-instagram" href="#">' +
                        '<img width="37" height="37" src="http://localhost/netmessage/public/assets/img/instagram.png" alt=""></a> </td>' +
                        '</tr></tbody></table>');
                    modifs.push("share-"+count);
                    count++;
                }else if(type == "pay"){

                    ui.item.replaceWith('<table id="pay-'+count+'"  border="0" cellspacing="0" cellpadding="0">' +
                        '<tr><td width="50"><img width="50" height="50" src="http://localhost/netmessage/public/assets/img/visa.png" alt="" style="margin-top: 8px;"></td>' +
                        '<td width="50"><img width="50" height="50" src="http://localhost/netmessage/public/assets/img/mastercard.png" alt=""></td></tr>' +
                        '<tr><td style="" colspan="2"> <table class="buttonwrapper"  border="0" cellspacing="0" cellpadding="0"><tr>' +
                        '<td><a id="pay-a-'+count+'" href="#" class="button" contentEditable=true style="background-color: rgb(224, 84, 67);height:45px;">Paiment</a></td' +
                        '></tr></table></td></tr></table>');
                    modifs.push("pay-"+count);
                    count++;
                }else if(type == "list"){

                    ui.item.replaceWith('<table id="list-'+count+'" width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><ul id="ul-list-'+count+'"><li><a href="#" contenteditable="true" id="list-a1-'+count+'">element 1</a></li><li><a href="#"  contenteditable="true" id="list-a2-'+count+'">element 2</a></li><li><a href="#" contenteditable="true" id="list-a3-'+count+'">element 3</a></li></ul></td></tr></table>');
                    modifs.push("list-"+count);
                    count++;
                }else if(type == "video"){
                    ui.item.replaceWith('<table id="blocVideo-'+count+'" width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td><iframe id="video-'+count+'" width="100%" height="315" src="https://www.youtube.com/embed/ELRNFtFxIs8" frameborder="0" allowfullscreen>"></iframe></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerVideo" data-id="video-'+count+'"  title="Configurer Video"><i class="fa fa-video-camera"></i></a></div></td></tr></table>');
                    modifs.push("blocVideo-"+count);
                    count++;
                }
            }

            $("#lengthModifs").html(modifs.length);
        },

    });

}
/******************************* Evenement Drop pour les Block**************************************************************/
function LoadSortableBlocks(){
    $( ".sortable" ).sortable({
        revert: true,
        start : function(event, ui) {
        },
        stop: function(event, ui) {
            $("#back").removeClass("disabled");
            if(event.handleObj.namespace == "draggable"){
                if(columnsSelected == "70,425"){
                    var tmp = columnsSelected.split(',');
                    ui.item.replaceWith('<table id="colonne70-'+count+'_colonne425-'+count+'" class="block" width="100%" border="0" cellspacing="0" cellpadding="0" ><tr><td colspan="2"><div class="tools"><a class="ui-corner"  data-type="2" title="Configurer"><i class="fa fa-cogs"></i></a></div></td></tr><tr><td colspan="2"><table id="colonne70-'+count+'" class="ui-sortable"  align="left" border="0" cellpadding="0" cellspacing="0" style="height:150px;width:'+tmp[0]+'px;"><tr><td  style="padding: 0 20px 20px 0;" class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]><table  style="width:'+tmp[1]+'px;" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="colonne425-'+count+'" class="col'+tmp[1]+' " align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:'+tmp[1]+'px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDrag"   title="Déplacer"><i class="fa fa-arrows"></i></a></div></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDelete" data-id="colonne70-'+count+'_colonne425-'+count+'"   title="Supprimer"><i class="fa fa-trash-o"></i></a></div></td></tr></table>');
                    modifs.push("colonne70-"+count+"_colonne425-"+count);
                    count++;
                }else if(columnsSelected == "100"){
                    ui.item.replaceWith('<table id="colonne100-'+count+'_" class="block" width="100%" border="0" cellspacing="0" cellpadding="0" style="height:150px;"><tr><td colspan="2"><div class="tools"><a class="ui-corner"  data-type="1" title="Configurer"><i class="fa fa-cogs"></i></a></div></td></tr><tr><td colspan="2"><table id="colonne100-'+count+'"  border="0" cellspacing="0" cellpadding="0" style="height:150px;width:100%;"><tr><td class="sortableElement"></td></tr></table></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDrag"   title="Déplacer"><i class="fa fa-arrows"></i></a></div></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDelete" data-id="colonne100-'+count+'_"   title="Supprimer"><i class="fa fa-trash-o"></i></a></div></td></tr></table>');
                    modifs.push("colonne100-"+count+"_");
                    count++;
                }else if(columnsSelected == "115,380"){
                    var tmp = columnsSelected.split(',');
                    ui.item.replaceWith('<table id="colonne115-'+count+'_colonne380-'+count+'" class="block" width="100%" border="0" cellspacing="0" cellpadding="0" style="height:150px;"><tr><td colspan="2"><div class="tools"><a class="ui-corner"  data-type="2" title="Configurer"><i class="fa fa-cogs"></i></a></div></td></tr><tr><td colspan="2"><table id="colonne115-'+count+'" class="ui-sortable"  align="left" border="0" cellpadding="0" cellspacing="0" style="height:150px;width:'+tmp[0]+'px;"><tr><td  style="padding: 0 20px 20px 0;" class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]><table style="width:'+tmp[1]+'px;" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table  id="colonne380-'+count+'" class="col'+tmp[1]+' " align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:'+tmp[1]+'px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDrag"   title="Déplacer"><i class="fa fa-arrows"></i></a></div></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDelete" data-id="colonne115-'+count+'_colonne380-'+count+'"   title="Supprimer"><i class="fa fa-trash-o"></i></a></div></td></tr></table>');
                    modifs.push("colonne115-"+count+"_colonne380-"+count);
                    count++;
                }
                else if(columnsSelected == "260-1,260-2"){
                    var tmp = columnsSelected.split(',');
                    ui.item.replaceWith('<table id="260-1-'+count+'_260-2-'+count+'" class="block" width="100%" border="0" cellspacing="0" cellpadding="0" ><tr><td colspan="2"><div class="tools"><a class="ui-corner"  data-type="2" title="Configurer"><i class="fa fa-cogs"></i></a></div></td></tr><tr><td colspan="2"><table id="260-1-'+count+'" class="ui-sortable"  align="left" border="0" cellpadding="0" cellspacing="0" style="height:150px;width:260px;"><tr><td  style="padding: 0 20px 20px 0;" class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="260-2-'+count+'" class="col260" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDrag"   title="Déplacer"><i class="fa fa-arrows"></i></a></div></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDelete" data-id="260-1-'+count+'_260-2-'+count+'"   title="Supprimer"><i class="fa fa-trash-o"></i></a></div></td></tr></table>');
                    modifs.push("260-1-"+count+"_260-2-"+count);
                    count++;
                }else if(columnsSelected == "174-1,174-2,174-3"){
                    var tmp = columnsSelected.split(',');
                    ui.item.replaceWith('<table id="174-1-'+count+'_174-2-'+count+'_174-3-'+count+'" class="block" width="100%" border="0" cellspacing="0" cellpadding="0" ><tr><td colspan="2"><div class="tools"><a class="ui-corner"  data-type="3" title="Configurer"><i class="fa fa-cogs"></i></a></div></td></tr><tr><td colspan="2"><table id="174-1-'+count+'" class="ui-sortable"  align="left" border="0" cellpadding="0" cellspacing="0" style="height:150px;width:174px;"><tr><td  style="padding: 0 20px 20px 0;" class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="174-2-'+count+'" class="col174" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> <!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="174-3-'+count+'" class="col174" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDrag"   title="Déplacer"><i class="fa fa-arrows"></i></a></div></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDelete" data-id="174-1-'+count+'_174-2-'+count+'_174-3-'+count+'"   title="Supprimer"><i class="fa fa-trash-o"></i></a></div></td></tr></table>');
                    modifs.push("174-1-"+count+"_174-2-"+count+"_174-3-"+count);
                    count++;
                }else if(columnsSelected == "130-1,130-2,130-3,130-4"){
                    var tmp = columnsSelected.split(',');
                    ui.item.replaceWith('<table id="130-1-'+count+'_130-2-'+count+'_130-3-'+count+'_130-4-'+count+'" class="block" width="100%" border="0" cellspacing="0" cellpadding="0" ><tr><td colspan="2"><div class="tools"><a class="ui-corner"  data-type="4" title="Configurer"><i class="fa fa-cogs"></i></a></div></td></tr><tr><td colspan="2"><table id="130-1-'+count+'" class="ui-sortable"  align="left" border="0" cellpadding="0" cellspacing="0" style="height:150px;width:130px;"><tr><td  style="padding: 0 20px 20px 0;" class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="130-2-'+count+'" class="col130" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> <!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="130-3-'+count+'" class="col130" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> <!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="130-4-'+count+'" class="col130" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDrag"   title="Déplacer"><i class="fa fa-arrows"></i></a></div></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDelete" data-id="130-1-'+count+'_130-2-'+count+'_130-3-'+count+'_130-4-'+count+'"   title="Supprimer"><i class="fa fa-trash-o"></i></a></div></td></tr></table>');
                    modifs.push("130-1-"+count+"_130-2-"+count+"_130-3-"+count+"_130-4-"+count);
                    count++;
                }else if(columnsSelected == "104-1,104-2,104-3,104-4,104-5"){
                    var tmp = columnsSelected.split(',');
                    ui.item.replaceWith('<table id="104-1-'+count+'_104-2-'+count+'_104-3-'+count+'_104-4-'+count+'_104-5-'+count+'" class="block" width="100%" border="0" cellspacing="0" cellpadding="0" ><tr><td colspan="2"><div class="tools"><a class="ui-corner"  data-type="5" title="Configurer"><i class="fa fa-cogs"></i></a></div></td></tr><tr><td colspan="2"><table id="104-1-'+count+'" class="ui-sortable"  align="left" border="0" cellpadding="0" cellspacing="0" style="height:150px;width:104px;"><tr><td  style="padding: 0 20px 20px 0;" class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="104-2-'+count+'" class="col104" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> <!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="104-3-'+count+'" class="col104" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> <!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="104-4-'+count+'" class="col104" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--><!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="104-5-'+count+'" class="col104" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDrag"   title="Déplacer"><i class="fa fa-arrows"></i></a></div></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDelete" data-id="104-1-'+count+'_104-2-'+count+'_104-3-'+count+'_104-4-'+count+'_104-5-'+count+'"   title="Supprimer"><i class="fa fa-trash-o"></i></a></div></td></tr></table>');
                    modifs.push("104-1-"+count+"_104-2-"+count+"_104-3-"+count+"_104-4-"+count+"_104-5-"+count);
                    count++;
                }else if(columnsSelected == "87-1,87-2,87-3,87-4,87-5,87-6"){
                    var tmp = columnsSelected.split(',');
                    ui.item.replaceWith('<table id="87-1-'+count+'_87-2-'+count+'_87-3-'+count+'_87-4-'+count+'_87-5-'+count+'_87-6-'+count+'" class="block" width="100%" border="0" cellspacing="0" cellpadding="0" ><tr><td colspan="2"><div class="tools"><a class="ui-corner"  data-type="6" title="Configurer"><i class="fa fa-cogs"></i></a></div></td></tr><tr><td colspan="2"><table id="87-1-'+count+'" class="ui-sortable"  align="left" border="0" cellpadding="0" cellspacing="0" style="height:150px;width:87px;"><tr><td  style="padding: 0 20px 20px 0;" class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="87-2-'+count+'" class="col87" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> <!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="87-3-'+count+'" class="col87" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> <!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="87-4-'+count+'" class="col87" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--><!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="87-5-'+count+'" class="col87" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--><!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="87-6-'+count+'" class="col87" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:150px;"><tr><td  class="sortableElement"></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDrag"   title="Déplacer"><i class="fa fa-arrows"></i></a></div></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDelete" data-id="87-1-'+count+'_87-2-'+count+'_87-3-'+count+'_87-4-'+count+'_87-5-'+count+'_87-6-'+count+'"   title="Supprimer"><i class="fa fa-trash-o"></i></a></div></td></tr></table>');
                    modifs.push("87-1-"+count+"_87-2-"+count+"_87-3-"+count+"_87-4-"+count+"_87-5-"+count+"_87-6-"+count);
                    count++;
                }else if(columnsSelected == "260-1,260-2,composant"){
                    var tmp = columnsSelected.split(',');
                    ui.item.replaceWith('<table id="260-1-'+count+'_260-2-'+count+'" class="block" width="100%" border="0" cellspacing="0" cellpadding="0" ><tr><td colspan="2"><div class="tools"><a class="ui-corner"  data-type="2" title="Configurer"><i class="fa fa-cogs"></i></a></div></td></tr><tr><td colspan="2"><table id="260-1-'+count+'" class="ui-sortable"  align="left" border="0" cellpadding="0" cellspacing="0" style="height:70px;width:260px;"><tr>' +
                        '<td  style="padding: 0 20px 20px 0;" class="sortableElement"> <table id="textImageCompose1-'+count+'" width="100%" border="0" cellspacing="0" cellpadding="0"> <tr><td ><div class="sortableElement ui-sortable" id="image2601-'+count+'" style="float:left;width:100%;text-align: center;border: 2px dashed #ff5722;padding: 6px;background-color: rgba(255,87,34,.6);"><form id="image2601-'+count+'-form"   class="dragImgTemplate" action="//jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data"><div class="dropzone2"><div class="mo-uploadzone" style="position: relative;  border: 2px dotted #808080; text-align: center;"><input class="fileupload" type="file" multiple="" name="files[]" style="z-index: 10;position: absolute;top: 0;left: 0;right: 0;bottom: 0;min-width: 100%;height: 100%;font-zie: 999px;text-align: right;filter: alpha(opacity=0);opacity: 0;outline: none;cursor: inherit;display: block;" title=""><span class="uploadzone uploadzoneImg" >Click or drag file here</span></div></div></form></div></td>'+
                        '</tr><tr><td style="padding: 20px 0 0 0;"><p id="260-1-' + count + '-p" class="bodycopy" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat.</p>' +

                        '</td></tr></table></td></tr></table><table id="260-2-'+count+'" class="col260" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:70px;"><tr><td style="padding: 0 20px 20px 0;"  class="sortableElement"><table id="textImageCompose2-'+count+'"  width="100%" border="0" cellspacing="0" cellpadding="0"> <tr><td ><div class="sortableElement ui-sortable" id="image2602-'+count+'" style="float:left;width:100%;text-align: center;border: 2px dashed #ff5722;padding: 6px;background-color: rgba(255,87,34,.6);"><form id="image2602-'+count+'-form"   class="dragImgTemplate" action="//jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data"><div class="dropzone2"><div class="mo-uploadzone" style="position: relative;  border: 2px dotted #808080; text-align: center;"><input class="fileupload" type="file" multiple="" name="files[]" style="z-index: 10;position: absolute;top: 0;left: 0;right: 0;bottom: 0;min-width: 100%;height: 100%;font-zie: 999px;text-align: right;filter: alpha(opacity=0);opacity: 0;outline: none;cursor: inherit;display: block;" title=""><span class="uploadzone uploadzoneImg" >Click or drag file here</span></div></div></form></div></td></tr><tr><td style="padding: 20px 0 0 0;">' +
                        ' <p id="260-2-' + count + '-p" class="bodycopy" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat.</p></td></tr></table></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDrag"   title="Déplacer"><i class="fa fa-arrows"></i></a></div></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDelete" data-id="260-1-'+count+'_260-2-'+count+'"   title="Supprimer"><i class="fa fa-trash-o"></i></a></div></td></tr></table>');
                    modifs.push("260-1-"+count+"_260-2-"+count+"");
                    count++;

                    var head= document.getElementsByTagName('head')[0];
                    var script= document.createElement('script');
                    script.type= 'text/javascript';
                    script.src= '/netmessage/public/assets/js/fileUpload/mainUploadFileComposant.js';
                    if(head.lastChild.src != "http://localhost/netmessage/public/assets/js/fileUpload/mainUploadFileComposant.js")
                        head.appendChild(script);
                    $('.dragImgTemplate').each(function (i,e) {

                        $(this).fileupload({
                            url: '/netmessage/public/server/php/',
                            dropZone: $(this),
                            autoUpload: true,
                            done : function(e, data){

                                CallAfterFileUpload(data);
                            }
                        });
                    });

                } else if(columnsSelected == "100,composant"){
                    var tmp = columnsSelected.split(',');
                    ui.item.replaceWith('<table id="colonne100-'+count+'_composant" class="block" width="100%" border="0" cellspacing="0" cellpadding="0" style="height:70px;"><tr><td colspan="2"><div class="tools"><a class="ui-corner"  data-type="1" title="Configurer"><i class="fa fa-cogs"></i></a></div></td></tr><tr><td colspan="2"><table id="colonne100-'+count+'"  border="0" cellspacing="0" cellpadding="0" style="height:70px;width:100%;"><tr><td class="sortableElement" style="padding: 0 20px 20px 0;">' +
                        '<table id="imagetitletextbutton-' + count + '" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                        '<tr><td style="padding: 20px 0 0 0;"><div class="sortableElement ui-sortable" id="image-'+count+'" style="float:left;width:100%;text-align: center;border: 2px dashed #ff5722;padding: 6px;background-color: rgba(255,87,34,.6);"><form id="image-'+count+'-form"   class="dragImgTemplate" action="//jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data"><div class="dropzone2"><div class="mo-uploadzone" style="position: relative;  border: 2px dotted #808080; text-align: center;"><input class="fileupload" type="file" multiple="" name="files[]" style="z-index: 10;position: absolute;top: 0;left: 0;right: 0;bottom: 0;min-width: 100%;height: 100%;font-zie: 999px;text-align: right;filter: alpha(opacity=0);opacity: 0;outline: none;cursor: inherit;display: block;" title=""><span class="uploadzone uploadzoneImg" >Click or drag file here</span></div></div></form></div></td></tr>' +
                        '<tr><td><h2 id="100-1-' + count + '-h2" class="h2" contentEditable=true>Welcome to our responsive email!</h2></td></tr>' +
                        '<tr><td><p id="100-1-' + count + '-p" class="bodycopy" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td></tr>' +
                        '<tr><td><a href="#" id="100-1-' + count + '-a" class="button" contentEditable=true style="background-color: rgb(224, 84, 67);height:45px;">Button</a> </td></tr>' +
                        '</table>' +
                        '</td></tr></table></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDrag"   title="Déplacer"><i class="fa fa-arrows"></i></a></div></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDelete" data-id="colonne100-'+count+'"   title="Supprimer"><i class="fa fa-trash-o"></i></a></div></td></tr></table>');
                    modifs.push("colonne100-"+count+"_composant");
                    count++;

                    var head= document.getElementsByTagName('head')[0];
                    var script= document.createElement('script');
                    script.type= 'text/javascript';
                    script.src= '/netmessage/public/assets/js/fileUpload/mainUploadFileComposant.js';
                    if(head.lastChild.src != "http://localhost/netmessage/public/assets/js/fileUpload/mainUploadFileComposant.js")
                        head.appendChild(script);
                    $('.dragImgTemplate').each(function (i,e) {

                        $(this).fileupload({
                            url: '/netmessage/public/server/php/',
                            dropZone: $(this),
                            autoUpload: true,
                            done : function(e, data){

                                CallAfterFileUpload(data);
                            }
                        });
                    });
                }else if(columnsSelected == "260-1,260-2,composantITTB"){
                    var tmp = columnsSelected.split(',');
                    ui.item.replaceWith('<table id="260-1-'+count+'_260-2-'+count+'" class="block" width="100%" border="0" cellspacing="0" cellpadding="0" ><tr><td colspan="2"><div class="tools"><a class="ui-corner"  data-type="2" title="Configurer"><i class="fa fa-cogs"></i></a></div></td></tr><tr><td colspan="2"><table id="260-1-'+count+'" class="ui-sortable"  align="left" border="0" cellpadding="0" cellspacing="0" style="height:70px;width:260px;"><tr>' +
                        '<td  style="padding: 0 20px 20px 0;" class="sortableElement">' +
                        '<table " width="100%" border="0" cellspacing="0" cellpadding="0"> <tr><td style="padding: 20px 0 0 0;">' +
                        '<table id="imagetitletextbutton-260-1' + count + '" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                        '<tr><td><div class="sortableElement ui-sortable" id="image2601-'+count+'" style="float:left;width:100%;text-align: center;border: 2px dashed #ff5722;padding: 6px;background-color: rgba(255,87,34,.6);"><form id="image2601-'+count+'-form"   class="dragImgTemplate" action="//jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data"><div class="dropzone2"><div class="mo-uploadzone" style="position: relative;  border: 2px dotted #808080; text-align: center;"><input class="fileupload" type="file" multiple="" name="files[]" style="z-index: 10;position: absolute;top: 0;left: 0;right: 0;bottom: 0;min-width: 100%;height: 100%;font-zie: 999px;text-align: right;filter: alpha(opacity=0);opacity: 0;outline: none;cursor: inherit;display: block;" title=""><span class="uploadzone uploadzoneImg" >Click or drag file here</span></div></div></form></div></td></tr>' +
                        '<tr><td><h2 id="260-1-' + count + '-h2" class="h2" contentEditable=true>Welcome to our responsive email!</h2></td></tr>' +
                        '<tr><td><p id="260-1-' + count + '-p" class="bodycopy" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td></tr>' +
                        '<tr><td><a href="#" id="260-1-' + count + '-a" class="button" contentEditable=true style="background-color: rgb(224, 84, 67);height:45px;">Button</a> </td></tr>' +
                        '</table>' +
                        '</td></tr></table></td></tr></table><table id="260-2-'+count+'" class="col260" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:70px;"><tr><td style="padding: 0 20px 20px 0;" class="sortableElement"><table  width="100%" border="0" cellspacing="0" cellpadding="0"> <tr><td style="padding: 20px 0 0 0;">' +
                        '<table id="imagetitletextbutton-260-2' + count + '" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                        '<tr><td><div class="sortableElement ui-sortable" id="image2602-'+count+'" style="float:left;width:100%;text-align: center;border: 2px dashed #ff5722;padding: 6px;background-color: rgba(255,87,34,.6);"><form id="image2602-'+count+'-form"   class="dragImgTemplate" action="//jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data"><div class="dropzone2"><div class="mo-uploadzone" style="position: relative;  border: 2px dotted #808080; text-align: center;"><input class="fileupload" type="file" multiple="" name="files[]" style="z-index: 10;position: absolute;top: 0;left: 0;right: 0;bottom: 0;min-width: 100%;height: 100%;font-zie: 999px;text-align: right;filter: alpha(opacity=0);opacity: 0;outline: none;cursor: inherit;display: block;" title=""><span class="uploadzone uploadzoneImg" >Click or drag file here</span></div></div></form></div></td></tr>' +
                        '<tr><td><h2 id="260-2-' + count + '-h2" class="h2" contentEditable=true>Welcome to our responsive email!</h2></td></tr>' +
                        '<tr><td><p id="260-2-' + count + '-p" class="bodycopy" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td></tr>' +
                        '<tr><td><a href="#" id="260-2-' + count + '-a" class="button" contentEditable=true style="background-color: rgb(224, 84, 67);height:45px;">Button</a> </td></tr>' +
                        '</table>' +
                        ' </td></tr></table></td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDrag"   title="Déplacer"><i class="fa fa-arrows"></i></a></div></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDelete" data-id="260-1-'+count+'_260-2-'+count+'"   title="Supprimer"><i class="fa fa-trash-o"></i></a></div></td></tr></table>');
                    modifs.push("260-1-"+count+"_260-2-"+count+"");
                    count++;

                    var head= document.getElementsByTagName('head')[0];
                    var script= document.createElement('script');
                    script.type= 'text/javascript';
                    script.src= '/netmessage/public/assets/js/fileUpload/mainUploadFileComposant.js';
                    if(head.lastChild.src != "http://localhost/netmessage/public/assets/js/fileUpload/mainUploadFileComposant.js")
                        head.appendChild(script);
                    $('.dragImgTemplate').each(function (i,e) {

                        $(this).fileupload({
                            url: '/netmessage/public/server/php/',
                            dropZone: $(this),
                            autoUpload: true,
                            done : function(e, data){

                                CallAfterFileUpload(data);
                            }
                        });
                    });
                }else if(columnsSelected == "174-1,174-2,174-3,composant"){
                    var tmp = columnsSelected.split(',');
                    ui.item.replaceWith('<table id="174-1-'+count+'_174-2-'+count+'_174-3-'+count+'" class="block" width="100%" border="0" cellspacing="0" cellpadding="0" ><tr><td colspan="2"><div class="tools"><a class="ui-corner"  data-type="3" title="Configurer"><i class="fa fa-cogs"></i></a></div></td></tr><tr><td colspan="2"><table id="174-1-'+count+'" class="ui-sortable"  align="left" border="0" cellpadding="0" cellspacing="0" style="height:70px;width:174px;">' +
                        '<tr><td  style="padding: 0 20px 20px 0;" class="sortableElement">' +
                        '<table id="imagetitletextbutton-' + count + '" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                        '<tr><td><div class="sortableElement ui-sortable" id="image1741-'+count+'" style="float:left;width:100%;text-align: center;border: 2px dashed #ff5722;padding: 6px;background-color: rgba(255,87,34,.6);"><form id="image1741-'+count+'-form"   class="dragImgTemplate" action="//jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data"><div class="dropzone2"><div class="mo-uploadzone" style="position: relative;  border: 2px dotted #808080; text-align: center;"><input class="fileupload" type="file" multiple="" name="files[]" style="z-index: 10;position: absolute;top: 0;left: 0;right: 0;bottom: 0;min-width: 100%;height: 100%;font-zie: 999px;text-align: right;filter: alpha(opacity=0);opacity: 0;outline: none;cursor: inherit;display: block;" title=""><span class="uploadzone uploadzoneImg" >Click or drag file here</span></div></div></form></div></td></tr>' +
                        '<tr><td><h2 class="h2" id="174-1-' + count + '-h2" contentEditable=true>Welcome to our responsive email!</h2></td></tr>' +
                        '<tr><td><p class="bodycopy" id="174-1-' + count + '-p" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td></tr>' +
                        '<tr><td><a href="#" id="174-1-' + count + '-a" class="button" contentEditable=true style="background-color: rgb(224, 84, 67);height:45px;">Button</a> </td></tr>' +
                        '</table>' +
                        '</td></tr></table><table id="174-2-'+count+'" class="col174" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:70px;">' +
                        '<tr><td  style="padding: 0 20px 20px 0;" class="sortableElement">' +
                        '<table id="imagetitletextbutton-' + count + '" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                        '<tr><td><div class="sortableElement ui-sortable" id="image1742-'+count+'" style="float:left;width:100%;text-align: center;border: 2px dashed #ff5722;padding: 6px;background-color: rgba(255,87,34,.6);"><form id="image1742-'+count+'-form"   class="dragImgTemplate" action="//jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data"><div class="dropzone2"><div class="mo-uploadzone" style="position: relative;  border: 2px dotted #808080; text-align: center;"><input class="fileupload" type="file" multiple="" name="files[]" style="z-index: 10;position: absolute;top: 0;left: 0;right: 0;bottom: 0;min-width: 100%;height: 100%;font-zie: 999px;text-align: right;filter: alpha(opacity=0);opacity: 0;outline: none;cursor: inherit;display: block;" title=""><span class="uploadzone uploadzoneImg" >Click or drag file here</span></div></div></form></div></td></tr>' +
                        '<tr><td><h2 id="174-2-' + count + '-h2" class="h2" contentEditable=true>Welcome to our responsive email!</h2></td></tr>' +
                        '<tr><td><p id="174-2-' + count + '-p" class="bodycopy" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td></tr>' +
                        '<tr><td><a href="#" id="174-2-' + count + '-a" class="button" contentEditable=true style="background-color: rgb(224, 84, 67);height:45px;">Button</a> </td></tr>' +
                        '</table>' +
                        '</td></tr></table><table id="174-3-'+count+'" class="col174" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:70px;">' +
                        '<tr><td  style="padding: 0 20px 20px 0;" class="sortableElement">' +
                        '<table id="imagetitletextbutton-' + count + '" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                        '<tr><td><div class="sortableElement ui-sortable" id="image1743-'+count+'" style="float:left;width:100%;text-align: center;border: 2px dashed #ff5722;padding: 6px;background-color: rgba(255,87,34,.6);"><form id="image1743-'+count+'-form"   class="dragImgTemplate" action="//jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data"><div class="dropzone2"><div class="mo-uploadzone" style="position: relative;  border: 2px dotted #808080; text-align: center;"><input class="fileupload" type="file" multiple="" name="files[]" style="z-index: 10;position: absolute;top: 0;left: 0;right: 0;bottom: 0;min-width: 100%;height: 100%;font-zie: 999px;text-align: right;filter: alpha(opacity=0);opacity: 0;outline: none;cursor: inherit;display: block;" title=""><span class="uploadzone uploadzoneImg" >Click or drag file here</span></div></div></form></div></td></tr>' +
                        '<tr><td><h2 class="h2" id="174-3-' + count + '-h2" contentEditable=true>Welcome to our responsive email!</h2></td></tr>' +
                        '<tr><td><p class="bodycopy" id="174-3-' + count + '-p" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td></tr>' +
                        '<tr><td><a href="#" id="174-3-' + count + '-a" class="button" contentEditable=true style="background-color: rgb(224, 84, 67);height:45px;">Button</a> </td></tr>' +
                        '</table>' +
                        '</td></tr></table></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDrag"   title="Déplacer"><i class="fa fa-arrows"></i></a></div></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDelete" data-id="174-1-'+count+'_174-2-'+count+'_174-3-'+count+'"   title="Supprimer"><i class="fa fa-trash-o"></i></a></div></td></tr></table>');
                    modifs.push("174-1-"+count+"_174-2-"+count+"_174-3-"+count);
                    count++;
                    var head= document.getElementsByTagName('head')[0];
                    var script= document.createElement('script');
                    script.type= 'text/javascript';
                    script.src= '/netmessage/public/assets/js/fileUpload/mainUploadFileComposant.js';
                    if(head.lastChild.src != "http://localhost/netmessage/public/assets/js/fileUpload/mainUploadFileComposant.js")
                        head.appendChild(script);
                    $('.dragImgTemplate').each(function (i,e) {

                        $(this).fileupload({
                            url: '/netmessage/public/server/php/',
                            dropZone: $(this),
                            autoUpload: true,
                            done : function(e, data){

                                CallAfterFileUpload(data);
                            }
                        });
                    });
                }else if(columnsSelected == "130-1,130-2,130-3,130-4,composant"){
                    var tmp = columnsSelected.split(',');
                    ui.item.replaceWith('<table id="130-1-'+count+'_130-2-'+count+'_130-3-'+count+'_130-4-'+count+'" class="block" width="100%" border="0" cellspacing="0" cellpadding="0" ><tr><td colspan="2"><div class="tools"><a class="ui-corner"  data-type="4" title="Configurer"><i class="fa fa-cogs"></i></a></div></td></tr><tr><td colspan="2"><table id="130-1-'+count+'" class="ui-sortable"  align="left" border="0" cellpadding="0" cellspacing="0" style="height:70px;width:130px;"><tr><td  style="padding: 0 0px 20px 0;" class="sortableElement">' +
                        '<table id="imagetitletextbutton-' + count + '" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                        '<tr><td><div class="sortableElement ui-sortable" id="image1301-'+count+'" style="float:left;width:100%;text-align: center;border: 2px dashed #ff5722;padding: 6px;background-color: rgba(255,87,34,.6);"><form id="image1301-'+count+'-form"   class="dragImgTemplate" action="//jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data"><div class="dropzone2"><div class="mo-uploadzone" style="position: relative;  border: 2px dotted #808080; text-align: center;"><input class="fileupload" type="file" multiple="" name="files[]" style="z-index: 10;position: absolute;top: 0;left: 0;right: 0;bottom: 0;min-width: 100%;height: 100%;font-zie: 999px;text-align: right;filter: alpha(opacity=0);opacity: 0;outline: none;cursor: inherit;display: block;" title=""><span class="uploadzone uploadzoneImg" >Click or drag file here</span></div></div></form></div></td></tr>' +
                        '<tr><td><h2 id="130-1-' + count + '-h2" class="h2" contentEditable=true>Welcome to our responsive email!</h2></td></tr>' +
                        '<tr><td><p id="130-1-' + count + '-p" class="bodycopy" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td></tr>' +
                        '<tr><td><a id="130-1-' + count + '-a" href="#" class="button" contentEditable=true style="background-color: rgb(224, 84, 67);height:45px;">Button</a> </td></tr>' +
                        '</table>' +
                        '</td></tr></table><table id="130-2-'+count+'" class="col130" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:70px;"><tr><td style="padding: 0 0px 20px 0;"  class="sortableElement">' +
                        '<table id="imagetitletextbutton-' + count + '" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                        '<tr><td><div class="sortableElement ui-sortable" id="image1302-'+count+'" style="float:left;width:100%;text-align: center;border: 2px dashed #ff5722;padding: 6px;background-color: rgba(255,87,34,.6);"><form id="image1302-'+count+'-form"   class="dragImgTemplate" action="//jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data"><div class="dropzone2"><div class="mo-uploadzone" style="position: relative;  border: 2px dotted #808080; text-align: center;"><input class="fileupload" type="file" multiple="" name="files[]" style="z-index: 10;position: absolute;top: 0;left: 0;right: 0;bottom: 0;min-width: 100%;height: 100%;font-zie: 999px;text-align: right;filter: alpha(opacity=0);opacity: 0;outline: none;cursor: inherit;display: block;" title=""><span class="uploadzone uploadzoneImg" >Click or drag file here</span></div></div></form></div></td></tr>' +
                        '<tr><td><h2 id="130-2-' + count + '-h2" class="h2" contentEditable=true>Welcome to our responsive email!</h2></td></tr>' +
                        '<tr><td><p id="130-2-' + count + '-p" class="bodycopy" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td></tr>' +
                        '<tr><td><a id="130-2-' + count + '-a" href="#" class="button" contentEditable=true style="background-color: rgb(224, 84, 67);height:45px;">Button</a> </td></tr>' +
                        '</table>' +
                        '</td></tr></table><table id="130-3-'+count+'" class="col130" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:70px;"><tr><td style="padding: 0 0px 20px 0;" class="sortableElement">' +
                        '<table id="imagetitletextbutton-' + count + '" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                        '<tr><td><div class="sortableElement ui-sortable" id="image1303-'+count+'" style="float:left;width:100%;text-align: center;border: 2px dashed #ff5722;padding: 6px;background-color: rgba(255,87,34,.6);"><form id="image1303-'+count+'-form"   class="dragImgTemplate" action="//jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data"><div class="dropzone2"><div class="mo-uploadzone" style="position: relative;  border: 2px dotted #808080; text-align: center;"><input class="fileupload" type="file" multiple="" name="files[]" style="z-index: 10;position: absolute;top: 0;left: 0;right: 0;bottom: 0;min-width: 100%;height: 100%;font-zie: 999px;text-align: right;filter: alpha(opacity=0);opacity: 0;outline: none;cursor: inherit;display: block;" title=""><span class="uploadzone uploadzoneImg" >Click or drag file here</span></div></div></form></div></td></tr>' +
                        '<tr><td><h2 id="130-3-' + count + '-h2" class="h2" contentEditable=true>Welcome to our responsive email!</h2></td></tr>' +
                        '<tr><td><p id="130-3-' + count + '-p" class="bodycopy" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td></tr>' +
                        '<tr><td><a id="130-3-' + count + '-a" href="#" class="button" contentEditable=true style="background-color: rgb(224, 84, 67);height:45px;">Button</a> </td></tr>' +
                        '</table>' +
                        '</td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--> <!--[if (gte mso 9)|(IE)]><table  width="520" align="left" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]--><table id="130-4-'+count+'" class="col130" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width:520px;height:70px;"><tr><td style="padding: 0 0px 20px 0;"  class="sortableElement">' +
                        '<table id="imagetitletextbutton-' + count + '" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                        '<tr><td><div class="sortableElement ui-sortable" id="image1304-'+count+'" style="float:left;width:100%;text-align: center;border: 2px dashed #ff5722;padding: 6px;background-color: rgba(255,87,34,.6);"><form id="image1304-'+count+'-form"   class="dragImgTemplate" action="//jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data"><div class="dropzone2"><div class="mo-uploadzone" style="position: relative;  border: 2px dotted #808080; text-align: center;"><input class="fileupload" type="file" multiple="" name="files[]" style="z-index: 10;position: absolute;top: 0;left: 0;right: 0;bottom: 0;min-width: 100%;height: 100%;font-zie: 999px;text-align: right;filter: alpha(opacity=0);opacity: 0;outline: none;cursor: inherit;display: block;" title=""><span class="uploadzone uploadzoneImg" >Click or drag file here</span></div></div></form></div></td></tr>' +
                        '<tr><td><h2 id="130-4-' + count + '-h2" class="h2" contentEditable=true>Welcome to our responsive email!</h2></td></tr>' +
                        '<tr><td><p id="130-4-' + count + '-p" class="bodycopy" contentEditable=true>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td></tr>' +
                        '<tr><td><a href="#" id="130-4-' + count + '-a" class="button" contentEditable=true style="background-color: rgb(224, 84, 67);height:45px;">Button</a> </td></tr>' +
                        '</table>' +
                        '</td></tr></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDrag"   title="Déplacer"><i class="fa fa-arrows"></i></a></div></td></tr><tr><td colspan="2"><div class="tools"><a class="ui-cornerDelete" data-id="130-1-'+count+'_130-2-'+count+'_130-3-'+count+'_130-4-'+count+'"   title="Supprimer"><i class="fa fa-trash-o"></i></a></div></td></tr></table>');
                    modifs.push("130-1-"+count+"_130-2-"+count+"_130-3-"+count+"_130-4-"+count);
                    count++;

                    var head= document.getElementsByTagName('head')[0];
                    var script= document.createElement('script');
                    script.type= 'text/javascript';
                    script.src= '/netmessage/public/assets/js/fileUpload/mainUploadFileComposant.js';
                    if(head.lastChild.src != "http://localhost/netmessage/public/assets/js/fileUpload/mainUploadFileComposant.js")
                        head.appendChild(script);
                    $('.dragImgTemplate').each(function (i,e) {

                        $(this).fileupload({
                            url: '/netmessage/public/server/php/',
                            dropZone: $(this),
                            autoUpload: true,
                            done : function(e, data){

                                CallAfterFileUpload(data);
                            }
                        });
                    });


                }
            }
            $("#lengthModifs").html(modifs.length);
            LoadSortableElements();
         },
    });



}

$(function() {
    LoadSortableBlocks();

    /***************************** Drag Les blocks*********************************/
    $( ".draggable" ).draggable({
        connectToSortable: ".sortable",
        helper: "clone",
        revert: "invalid",
        start: function(event, ui) {
            columnsSelected = $(this).attr("data-column");
        },
    });
    /***************************** Drag Les Comosants*********************************/
    $( ".draggable2" ).draggable({

        connectToSortable: ".sortableElement",
        helper: "clone",
        revert: "invalid",
        start: function(event, ui) {

            type = $(this).attr("data-type");
        },


    });

    $( ".draggable" ).disableSelection();
    $( ".draggable2" ).disableSelection();



    /***************************** Evenement du Preview***************************************/
    $(".viewPeri").click(function(){

        var val = $(this).attr("data-view");

        if(val == "mobile"){
            $(".container").addClass("mobileBackground");
            $(".container").removeClass("ipadBackground");

            $("#Controller").removeClass("content");
            $("#Controller").removeClass("ipadContent");
            $("#Controller").addClass("mobileContent");
        }else if(val == "ipad"){

            $(".container").removeClass("mobileBackground");
            $(".container").addClass("ipadBackground");

            $("#Controller").removeClass("content");
            $("#Controller").addClass("ipadContent");
            $("#Controller").removeClass("mobileContent");
        }else{
            $(".container").removeClass("mobileBackground");
            $(".container").removeClass("ipadBackground");

            $("#Controller").addClass("content");
            $("#Controller").removeClass("ipadContent");
            $("#Controller").removeClass("mobileContent");
        }

    });
    /***************************** Evenement du validation template*********************************/
    $("#valide").click(function(){
       /* var objectCss = '<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"><link rel="stylesheet" href="http://www.neway-si.com/media.css"><link rel="stylesheet" href="http://www.neway-si.com/styleEditeur.css">';
        $('#textarea').val(objectCss+$(".container").html());
        $('#textarea').css({"display":"block"});
        */

    });
    /***************************** Evenement Retour en arriere (UNDO)*********************************/
    $("#back").click(function(){
        if(modifs.length > 0 && !$(this).hasClass("disabled")){
            var element = modifs.pop();
            if(element != undefined){
                modifsNext.push(element);
                $('#'+element).wrap("<div class='hide' style='display: none;'></div>");

                $("#lengthModifs").html(modifs.length);
                if(modifs.length == 0){
                    $("#back").addClass("disabled");
                }
                $("#next").removeClass("disabled");
            }
        }
    });
    /***************************** Evenement REDO *********************************/
    $("#next").click(function(){
        if(modifsNext.length > 0 && !$(this).hasClass("disabled")){
            var element = modifsNext.pop();
            if(element != undefined){
                modifs.push(element);

                if($('#'+element).parent().is( "div" )){
                    $('#'+element).unwrap();
                }
                $("#lengthModifs").html(modifs.length);
                if(modifsNext.length == 0){
                    $("#next").addClass("disabled");
                }
                $("#back").removeClass("disabled");
            }
        }

    });
    /***************************** Evenement pour naviguer sur le menu *********************************/
    $(".menu-choix").click(function(){
        var id = $(this).attr("data-id");

        $(".menu-choix").removeClass("active");
        $(this).addClass("active");

        $(".menu-content").hide();
        $("#"+id).show();

        return false;
    });
    /***************************** Evenement pour Manipuler le style des blocks*********************************/
    $(document).on("click",".ui-corner",function(){
        $(".menu-choix").removeClass("active");
        $(".menu-choix[data-id='style']").addClass("active");

        $(".menu-content").hide();
        $("#style").show();

        $("#styleContent").empty();
        var lenght = $(this).attr("data-type");
        var id = $(this).parent().parent().parent().parent().parent().attr("id").split('_');
        for(var i=0;i<lenght;i++){
            if(id[i] != "" && id[i] != undefined){
                var styleProps = $( "#"+id[i] ).css([
                    "width", "height",  "background-color"
                ]);
                $("#styleContent").append("<div style='float:left;width : 100%;padding: 15px;background: white;border-radius: 5px;color: #E47C00; margin-top: 10px;'><h4 style='margin: 2px 0px;'>Colonne "+(i+1)+" :</h4><hr /><table width='100%' style='margin-top: 5px;float: left;' ><tr style='height: 40px;'><td align='center' width='50%'> <label>Largeur :</label></td><td align='left' width='50%'><input type='text' value='"+styleProps['width']+"' class='form-control inputStyle' id='"+id[i]+"_width' style='height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Longueur :</label></td><td align='left' width='50%'><input type='text' value='"+styleProps['height']+"' class='form-control inputStyle' id='"+id[i]+"_height' style='height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Background :</label></td><td align='left' width='50%'><input type='text' value='"+styleProps['background-color']+"' class='form-control inputStyle' id='"+id[i]+"_background-color' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /><div id='"+id[i]+"_background-color_cercle' style='float: left;     margin-left: 5px;   height: 25px;border-radius: 50%;width: 25px;border: 0;box-shadow: 1px 1px 3px #727272;    background-color: "+styleProps['background-color']+";'></div></td></tr></table></div>");
            }
        }

        return false;
    });
    /***************************** Evenement pour Suprrimer Block*********************************/
    $(document).on("click",".ui-cornerDelete",function(){

        var element =$(this).attr('data-id');
        modifs.pop();
        modifsNext.push(element);
        $('#'+element).wrap("<div class='hide' style='display: none;'></div>");

        $("#lengthModifs").html(modifs.length);
        if(modifs.length == 0){
            $("#back").addClass("disabled");
        }
        $("#next").removeClass("disabled");
        return false;
    });
    /***************************** Evenement pour manipuler le style des composants*********************************/
    $(document).on("click","img[id*='imageReel'],#Controller img[id*='image'],a.button,hr,.shareComposant,#Controller li a,.ui-cornerVideo",function(){
        $(".menu-choix").removeClass("active");
        $(".menu-choix[data-id='style']").addClass("active");

        $(".menu-content").hide();
        $("#style").show();

        $("#styleContent").empty();
        var id = $(this).attr("id");
        if($(this).get(0).nodeName == "IMG") {
            var styleProps = $("#" + id).css([
                "width", "border", "margin-top", "margin-left", "margin-right", "margin-bottom",
            ]);
            $("#styleContent").append("<div style='float:left;width : 100%;padding: 15px;background: white;border-radius: 5px;color: #E47C00; margin-top: 10px;'><h4 style='margin: 2px 0px;'>Image :</h4><hr /><table width='100%' style='margin-top: 5px;float: left;' ><tr style='height: 40px;'><td align='center' width='50%'> <label>Largeur :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['width'] + "' class='form-control inputStyle' id='" + id + "_width' style='height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Bordre :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['border'] + "' class='form-control inputStyle' id='" + id + "_border' style='height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Margin-top :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['margin-top'] + "' class='form-control inputStyle' id='" + id + "_margin-top' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Margin-left :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['margin-left'] + "' class='form-control inputStyle' id='" + id + "_margin-left' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Margin-right :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['margin-right'] + "' class='form-control inputStyle' id='" + id + "_margin-right' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Margin-bottom :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['margin-bottom'] + "' class='form-control inputStyle' id='" + id + "_margin-bottom' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur mobile</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnMobile' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur ipad</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnIpad' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur Desktop</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnDesktop' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr></table><a id='delete_"+id+"' href='#' class='button-delete delete-composant'  style='float:right;background-color: rgb(224, 84, 67);height:45px;'>Supprimer</a></div>");

        }else if($(this).attr("class") == "ui-cornerVideo"){
            var id = $(this).attr("data-id");
            var styleProps = $( "#"+id ).css([
                "width", "height"
            ]);
            var url = $(this).attr("src");
            $("#styleContent").append("<div style='float:left;width : 100%;padding: 15px;background: white;border-radius: 5px;color: #E47C00; margin-top: 10px;'><h4 style='margin: 2px 0px;'>Video :</h4><hr /><table width='100%' style='margin-top: 5px;float: left;' ><tr style='height: 40px;'><td align='center' width='50%'> <label>Largeur :</label></td><td align='left' width='50%'><input type='text' value='"+styleProps['width']+"' class='form-control inputStyle' id='"+id+"_width' style='height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr style='height: 40px;'><td align='center' width='50%'> <label>Longueur :</label></td><td align='left' width='50%'><input type='text' value='"+styleProps['height']+"' class='form-control inputStyle' id='"+id+"_height' style='height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Lien :</label></td><td align='left' width='50%'><input type='text' value='"+$("#"+id).attr("src")+"'  class='form-control inputAttribut' id='" + id + "_src' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur mobile</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnMobile' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur ipad</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnIpad' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur Desktop</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnDesktop' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr></table><a id='delete_"+id+"' href='#' class='button-delete delete-composant'  style='float:right;background-color: rgb(224, 84, 67);height:45px;'>Supprimer</a></div>");

        }else if($(this).get(0).nodeName == "A"){

            var styleProps = $( "#"+id ).css([
                "color", "background-color",  "width", "padding-top", "padding-left", "padding-right", "padding-bottom", "btn-title"
            ]);

            var url = $(this).attr("href");
            var btnTitle = $(this).text();
            $("#styleContent").append("<div style='float:left;width : 100%;padding: 15px;background: white;border-radius: 5px;color: #E47C00; margin-top: 10px;'><h4 style='margin: 2px 0px;'>Button :</h4><hr /><table width='100%' style='margin-top: 5px;float: left;' ><tr style='height: 40px;'><td align='center' width='50%'> <label>Largeur :</label></td><td align='left' width='50%'><input type='text' value='"+styleProps['width']+"' class='form-control inputStyle' id='"+id+"_width' style='height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Background :</label></td><td align='left' width='50%'><input type='text' value='"+styleProps['background-color']+"' class='form-control inputStyle' id='"+id+"_background-color' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /><div id='"+id+"_background-color_cercle' style='float: left;     margin-left: 5px;   height: 25px;border-radius: 50%;width: 25px;border: 0;box-shadow: 1px 1px 3px #727272;    background-color: "+styleProps['background-color']+";'></div></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Color :</label></td><td align='left' width='50%'><input type='text' value='#ffffff' class='form-control inputStyle' id='"+id+"_color' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /><div id='"+id+"_color_cercle' style='float: left;     margin-left: 5px;   height: 25px;border-radius: 50%;width: 25px;border: 0;box-shadow: 1px 1px 3px #727272;    background-color: "+styleProps['color']+";'></div></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Padding-top :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['padding-top'] + "' class='form-control inputStyle' id='" + id + "_padding-top' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Padding-left :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['padding-left'] + "' class='form-control inputStyle' id='" + id + "_padding-left' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Padding-right :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['padding-right'] + "' class='form-control inputStyle' id='" + id + "_padding-right' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr>" +
                "<tr  style='height: 40px;'><td align='center' width='50%'> <label>Padding-bottom :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['padding-bottom'] + "' class='form-control inputStyle' id='" + id + "_padding-bottom' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr>" +
                "<tr  style='height: 40px;'><td align='center' width='50%'> <label>URL :</label></td><td align='left' width='50%'><input type='text' value='" + url + "' class='form-control inputAttribut' id='" + id + "_href' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr>" +
                "<tr  style='height: 40px;'><td align='center' width='50%'> <label>Titre :</label></td><td align='left' width='50%'><input type='text' value='" + btnTitle + "' class='form-control inputStyle' id='" + id + "_btn-title' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr>" +
                "<tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur mobile</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnMobile' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur ipad</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnIpad' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur Desktop</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnDesktop' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr></table><a id='delete_"+id+"' href='#' class='button-delete delete-composant'  style='float:right;background-color: rgb(224, 84, 67);height:45px;'>Supprimer</a></div>");
            //On récupére la couleur du btn pour afficher son code hex pré-remplit ds les paramètres de la partie style.
            var btnColor =  $('#'+id).css('backgroundColor');
            $("#"+id+"_background-color").val(rgb2hex(btnColor));
            //Fonction qui change le background-color du bouton
            colorPickerBackground(id);
            //Fonction qui change la couleur du texte du bouton
            colorPickerColor(id);

        }else if($(this).get(0).nodeName == "HR"){
            var styleProps = $( "#"+id ).css([
                "width", "height",  "background-color", "margin-top",  "margin-bottom"
            ]);
            $("#styleContent").append("<div style='float:left;width : 100%;padding: 15px;background: white;border-radius: 5px;color: #E47C00; margin-top: 10px;'><h4 style='margin: 2px 0px;'>Séparateur :</h4><hr /><table width='100%' style='margin-top: 5px;float: left;' ><tr style='height: 40px;'><td align='center' width='50%'> <label>Largeur :</label></td><td align='left' width='50%'><input type='text' value='"+styleProps['width']+"' class='form-control inputStyle' id='"+id+"_width' style='height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr style='height: 40px;'><td align='center' width='50%'> <label>Longueur :</label></td><td align='left' width='50%'><input type='text' value='"+styleProps['height']+"' class='form-control inputStyle' id='"+id+"_height' style='height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Background :</label></td><td align='left' width='50%'><input type='text' value='"+styleProps['background-color']+"' class='form-control inputStyle' id='"+id+"_background-color' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /><div id='"+id+"_background-color_cercle' style='float: left;     margin-left: 5px;   height: 25px;border-radius: 50%;width: 25px;border: 0;box-shadow: 1px 1px 3px #727272;    background-color: "+styleProps['background-color']+";'></div></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Margin-top :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['margin-top'] + "' class='form-control inputStyle' id='" + id + "_margin-top' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Margin-bottom :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['margin-bottom'] + "' class='form-control inputStyle' id='" + id + "_margin-bottom' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur mobile</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnMobile' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur ipad</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnIpad' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur Desktop</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnDesktop' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr></table><a id='delete_"+id+"' href='#' class='button-delete delete-composant'  style='float:right;background-color: rgb(224, 84, 67);height:45px;'>Supprimer</a></div>");
            //Fonction qui change le background-color du bouton
            colorPickerBackground(id);
            var separatorColor =  $('#'+id).css('backgroundColor');
            $("#"+id+"_background-color").val(rgb2hex(separatorColor));
        }else if($(this).attr("class") == "shareComposant"){
            var styleProps = $( "#"+id ).css([
                "width", "height",  "background-color", "margin-top",  "margin-bottom"
            ]);
            $("#styleContent").append("<div style='float:left;width : 100%;padding: 15px;background: white;border-radius: 5px;color: #E47C00; margin-top: 10px;'><h4 style='margin: 2px 0px;'>Réseaux sociaux :</h4><hr /><table width='100%' style='margin-top: 5px;float: left;' ><tr  style='height: 40px;'><td align='center' width='50%'> <label>Facebook :</label></td><td align='left' width='50%'><input type='text' value='"+$("#"+id+"-facebook").attr("href")+"'  class='form-control inputAttribut' id='" + id + "-facebook_href' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Twitter :</label></td><td align='left' width='50%'><input type='text' value='"+$("#"+id+"-twitter").attr("href")+"'  class='form-control inputAttribut' id='" + id + "-twitter_href' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Instagram :</label></td><td align='left' width='50%'><input type='text' value='"+$("#"+id+"-instagram").attr("href")+"'  class='form-control inputAttribut' id='" + id + "-instagram_href' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur mobile</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnMobile' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur ipad</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnIpad' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur Desktop</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnDesktop' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr></table><a id='delete_"+id+"' href='#' class='button-delete delete-composant'  style='float:right;background-color: rgb(224, 84, 67);height:45px;'>Supprimer</a></div>");

        }
        $('.inputShowOnDevice').checkboxpicker();
        return false;
    });
    /***************************** Evenement pour implementer Plugin CKEDITOR*********************************/
    $(document).on("click","#Controller p,#Controller b,#Controller h1,#Controller h2,#Controller h3,#Controller h4,#Controller h5,#Controller h6",function(){

        var id =$(this).attr( "id" );
        var editor = CKEDITOR.replace( id );
        $(document).on( 'mouseleave',"#cke_"+id, function( evt ) {
            var contenu =  editor.getData().replace('<p>','').replace('</p>','');
           editor.updateElement();
            editor.destroy();
            $('#'+id).html(contenu);

           // console.log( );
        });
        $(".menu-choix").removeClass("active");
        $(".menu-choix[data-id='style']").addClass("active");

        $(".menu-content").hide();
        $("#style").show();

        $("#styleContent").empty();


            var styleProps = $("#" + id).css([
                "font-size", "font-family","color" ,"margin-top", "margin-left", "margin-right", "margin-bottom",
            ]);
            $("#styleContent").append("<div style='float:left;width : 100%;padding: 15px;background: white;border-radius: 5px;color: #E47C00; margin-top: 10px;'><h4 style='margin: 2px 0px;'>Texte :</h4><hr /><table width='100%' style='margin-top: 5px;float: left;' ><tr style='height: 40px;'><td align='center' width='50%'> <label>font-size :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['font-size'] + "' class='form-control inputStyle' id='" + id + "_font-size' style='height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>font-family :</label></td><td align='left' width='50%'><select  class='form-control inputStyle' id='" + id + "_font-family' style='height:auto;padding: 2px;border-radius: 2px;width: 88px;'><option >Arial</option></select></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Color :</label></td><td align='left' width='50%'><input type='text' value='"+styleProps['color']+"' class='form-control inputStyle' id='"+id+"_color' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /><div id='"+id+"_color_cercle' style='float: left;     margin-left: 5px;   height: 25px;border-radius: 50%;width: 25px;border: 0;box-shadow: 1px 1px 3px #727272;    background-color: "+styleProps['color']+";'></div></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Margin-top :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['margin-top'] + "' class='form-control inputStyle' id='" + id + "_margin-top' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Margin-left :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['margin-left'] + "' class='form-control inputStyle' id='" + id + "_margin-left' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Margin-right :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['margin-right'] + "' class='form-control inputStyle' id='" + id + "_margin-right' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Margin-bottom :</label></td><td align='left' width='50%'><input type='text' value='" + styleProps['margin-bottom'] + "' class='form-control inputStyle' id='" + id + "_margin-bottom' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur mobile</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnMobile' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur ipad</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnIpad' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr><tr  style='height: 40px;'><td align='center' width='50%'> <label>Aparraitre sur Desktop</label></td><td align='left' width='50%'><input type='checkbox' checked='checked' data-reverse class='form-control inputShowOnDevice' id='" + id + "_hideOnDesktop' style='float:left;height:auto;padding: 2px;width: 88px;' /></td></tr></table><a id='delete_"+id+"' href='#' class='button-delete delete-composant'  style='float:right;background-color: rgb(224, 84, 67);height:45px;'>Supprimer</a></div>");
        $('.inputShowOnDevice').checkboxpicker();
        colorPickerColor(id);
            return false;
    });
    /***************************** Evenement pour appliquer les valeurs des styles entrées*********************************/
    $(document).on("keyup",".inputStyle",function(){

        var id = $(this).attr("id").split("_");
        var val =$(this).val();
        var newVal =$(this).val().replace('px', '');
        var styleAttrib =id[1];

        if(styleAttrib == "width" ){
            if($("#"+id[0]).is('[class*="col"]')){
                $("#"+id[0]).removeClass($("#"+id[0]).attr("class"));
                $("#"+id[0]).addClass("col"+newVal);
                $("#"+id[0]).css("max-width","520px");
                $("#"+id[0]).css("width","100%");
            }else{
                $("#"+id[0]).css(styleAttrib,val);
            }

        }else if(styleAttrib == "btn-title"){
            $("#"+id[0]).text(val);
        }else{

            if(styleAttrib == "background-color" || styleAttrib == "color"){
                $("#"+id[0]+"_"+styleAttrib+"_cercle").css("background-color",val);
            }

            $("#"+id[0]).css(styleAttrib,val);
        }

    });
    /***************************** Evenement pour appliquer les valeurs attributs (URL -> a )*********************************/
    $(document).on("keyup",".inputAttribut",function(){

        var id = $(this).attr("id").split("_");
        var attribut = id[1];
        var valeur =$(this).val();
        valeur = valeur.replace("https://","");
        if(attribut == "src" && id[0].indexOf('video') > -1){
            valeur = valeur.replace("watch?v=", "v/");
        }
        valeur ="https://"+valeur;

            $("#"+id[0]).attr(attribut,valeur);

        });
    /***************************** Evenement pour afficher les options des blocks*********************************/
    $(document).on("mouseenter",".block",function(){
        $(this).find(".tools").show();
    });
    /***************************** Evenement pour cacher les options des blocks*********************************/
    $(document).on("mouseleave",".block",function(){
        $(this).find(".tools").hide();
    });
    /***************************** Evenement pour pour Drag & Drop*********************************/
    $(document).bind('drop dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if(e.type == "drop"){

            $( "#ui-state-drop-data" ).hide("slow" );
            //$('.uploadzoneImg').stop( true, true ).fadeOut();
            return false;
        }
        $( "#ui-state-drop-data" ).show("slow" );


        return false;
    });
    /***************************** Evenement pour supprimer un composant*********************************/
    $(document).on("click",".delete-composant", function (){
        var id = $(this).attr("id");
        id = id.split("_");
        console.log(modifs.pop());
        modifsNext.push(id[1]);
        $("#"+id[1]).wrap('<div class="hide" style="display: none"></div>');
        $("#lengthModifs").html(modifs.length);
        if(modifs.length == 0){
            $("#back").addClass("disabled");
        }
        $("#next").removeClass("disabled");
        return false;
    });
    /****************************  Evenement 'beforeunload' pour afficher une alerte  si l'utilisateur ferme la fenetre ou clique sur actualiser ou précédent *************/

    window.addEventListener("beforeunload", function (e) {
        console.log("beforeunload");
        if (unsaved) {
            return undefined;
        }

        var confirmationMessage = 'Souhaitez­vous sauvegarder le travail ?';

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });


    $(document).on('click','#BtnStep1Next', function (e) {
        $('#ImportHtmlStep3').hide();
        $('#ImportHtmlStep1').hide();
        $('#ImportHtmlStep2').show();
        return false;
    });
    $(document).on('click','#BtnStep2Back', function (e) {
        $('#ImportHtmlStep3').hide();
        $('#ImportHtmlStep2').hide();
        $('#ImportHtmlStep1').show();

        return false;
    });
    $(document).on('click','#BtnStep2Next', function (e) {

        $('#ImportHtmlStep2').hide();
        $('#ImportHtmlStep1').hide();
        $('#ImportHtmlStep3').show();

        return false;
    });
    $(document).on('click','#BtnStep3Back', function (e) {


        $('#ImportHtmlStep1').hide();
        $('#ImportHtmlStep3').hide();
        $('#ImportHtmlStep2').show();

        return false;
    });

    /*********  Evenement  pour afficher la confirmation de la sauvegarde ******/
    /*socket.on('saveWorkStatus', function(status) {
        if(status) {
            alert("Travail sauvegrdé avec succès");
        } else {
            alert("Erreur lors de la sauvegarde du travail");
        }
    });*/
    /*********  Evenement pour afficher template choisi par l'utilisateur ******/
    /*socket.on('setTemplate', function(data) {
        console.log(data);
        //window.location.replace('http://localhost/editeur/public/responsive');
    });*/


});
/*******Fonction pour savegarder le travail********/
function saveWork(file) {
    socket.emit('saveWork', file);
}
/*******Fonction pour modifier le code HTML******/
function editHtml(code) {

    editor.setValue(code);

}
function editHtmlCode(code) {
    $('#Controller').html(code);
    refreshContainerForDragBlocks();
    LoadSortableElements();
    LoadSortableBlocks();


}
/*******Fonction pour modifier template choisi par l'utilisateur******/
function getTemplate(name) {
    socket.emit('getTemplate', name);
}

function initPopUpImport() {
    $('#ImportHtmlStep2').hide();
    $('#ImportHtmlStep3').hide();
    $('#ImportHtmlStep1').show();
}

function colorPickerBackground(id){
    $('#'+id+'_background-color_cercle').ColorPicker({
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('#'+id+'_background-color_cercle').css('backgroundColor', '#' + hex);
            $('#'+id).css('backgroundColor', '#' + hex);
            $('#'+id+'_background-color').val('#'+hex);
            //console.log(JSON.stringify(hsb, null, 4))
        }});


}

function colorPickerColor(id){
    $('#'+id+'_color_cercle').ColorPicker({
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('#'+id+'_color_cercle').css('backgroundColor', '#' + hex);
            $('#'+id).css('color', '#' + hex);
            $('#'+id+'_color').val('#'+hex);
        }});
}

$('#emailContent').click(function(e) {
    $(".menu-choix").removeClass("active");
    $(".menu-choix[data-id='style']").addClass("active");
    $(".menu-content").hide();
    $("#style").show();
    $("#styleContent").empty();
    var id = $(this).attr("id");
    $("#styleContent").append("<div style='float:left;width : 100%;padding: 15px;background: white;border-radius: 5px;color: #E47C00; margin-top: 10px;'><h4 style='margin: 2px 0px;'>Header, Body, Footer</h4><hr/><table width='100%' style='margin-top: 5px;float: left;' ><tr style='height: 40px;'><td align='center' width='45%'><label>Header background :</label></td><td align='left' width='50%'> <input type='text' value='#ffffff' class='form-control inputStyle' id='headerContent_background-color' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /> <div id='headerContent_background-color_cercle' style='float: left; margin-left: 5px; height: 25px;border-radius: 50%;width: 25px;border: 0;box-shadow: 1px 1px 3px #727272; '></div></td></tr><tr  style='height: 40px;'> <td align='center' width='50%'> <label>Body background :</label> </td><td align='left' width='50%'> <input type='text' value='#F5F5F5' class='form-control inputStyle' id='bodyContent_background-color' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /> <div id='bodyContent_background-color_cercle' style='float: left; margin-left: 5px; height: 25px;border-radius: 50%;width: 25px;border: 0;box-shadow: 1px 1px 3px #727272;'></div></td></tr> <tr style='height: 40px;'><td align='center' width='50%'> <label>Footer background :</label></td><td align='left' width='50%'><input type='text' value='#ffffff' class='form-control inputStyle' id='footerContent_background-color' style='float:left;height:auto;padding: 2px;border-radius: 2px;width: 88px;' /><div id='footerContent_background-color_cercle' style='float: left;     margin-left: 5px;   height: 25px;border-radius: 50%;width: 25px;border: 0;box-shadow: 1px 1px 3px #727272;'></div></td></tr> </div>");
    var headerCercleColor =  $('#headerContent').css('backgroundColor');
    $('#headerContent_background-color_cercle').css('backgroundColor', headerCercleColor);
    $('#headerContent_background-color').val(rgb2hex(headerCercleColor));
    var bodyCercleColor =  $('#bodyContent').css('backgroundColor');
    $('#bodyContent_background-color_cercle').css('backgroundColor', bodyCercleColor);
    $('#bodyContent_background-color').val(rgb2hex(bodyCercleColor));
    var footerCercleColor =  $('#footerContent').css('backgroundColor');
    $('#footerContent_background-color_cercle').css('backgroundColor', footerCercleColor);
    $('#footerContent_background-color').val(rgb2hex(footerCercleColor));
    $('#headerContent_background-color_cercle, #footerContent_background-color_cercle, #bodyContent_background-color_cercle').ColorPicker({
        onShow: function (colpkr) {
            id = $(this).attr("id");
            ids = id.split("_");
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('#'+ids[0]+'_background-color_cercle').css('backgroundColor', '#' + hex);
            $('#'+ids[0]).css('backgroundColor', '#' + hex);
            $('#'+ids[0]+'_background-color').val('#'+hex);
        }});
    return;
});

/************Fonctions pour convertir les couleurs rgb en hexadecimal******/

var hexDigits = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}