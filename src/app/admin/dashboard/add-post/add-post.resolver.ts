import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Post} from "../post-table/post-table.component";
import {GlobalPostService} from "../../../shared/global-post.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AddPostResolver implements Resolve<Post | null>{
  constructor(private globalPostService: GlobalPostService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.globalPostService.getOnePost(+route.params['id']);
  }
}
