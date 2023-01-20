from rest_framework import permissions


class IsManagerOrOwner(permissions.DjangoModelPermissions):
    def has_permission(self, request, view):
        user=request.user
        pk=view.kwargs["pk"]
        if pk is None:
            return True
        blog=view.get_queryset().filter(pk=pk)
        if not blog.exists():
            return True
        blog=blog.first()
        return user.has_perm("blog.change_blog") or blog.owner==user