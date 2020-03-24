import unauthorized from "views/status/unauthorized";
import system_database_back from "views/system/database/back";
import system_database_del from "views/system/database/del";
import system_syncset_syslog from "views/system/syncset/syslog";
import system_syncset_elk from "views/system/syncset/elk";
import system_productupdate_online from "views/system/productupdate/online";
import system_productupdate_offline from "views/system/productupdate/offline";
const layerComponent = {
  unauthorized: unauthorized,
  system_syncset_syslog: system_syncset_syslog,
  system_syncset_elk: system_syncset_elk,
  system_database_back: system_database_back,
  system_database_del: system_database_del,
  system_productupdate_online: system_productupdate_online,
  system_productupdate_offline: system_productupdate_offline
};
export default layerComponent;
