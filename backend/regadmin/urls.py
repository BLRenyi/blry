from django.urls import path
from .views import get_step_to_approve, approve_user_step, reject_user_step
from .views import get_sys_step_list, update_step_seq, get_step_detail, update_step_detail
from .views import get_question_detail, update_question_detail
urlpatterns = [
    path('getsteptoapprove', get_step_to_approve, name='get_step_to_approve'),
    path('approveuserstep', approve_user_step, name='approve_user_step'),
    path('rejectuserstep', reject_user_step, name='reject_user_step'),
    path('getsyssteps', get_sys_step_list, name='get_sys_step_list'),
    path('updatestepseq', update_step_seq, name= 'update_step_seq'),
    path('getstepdetail', get_step_detail, name='get_step_detail'),
    path('updatestepdetail', update_step_detail, name='update_step_detail'),
    path('getquestiondetail', get_question_detail, name='get_question_detail'),
    path('updatequestiondetail', update_question_detail, name='update_question_detail')
]
