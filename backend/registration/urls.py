from django.urls import path
from .views import get_user_by_username, get_user_by_register_id, edit_user
from .views import get_sys_question_option
from .views import get_sys_step, get_sys_step_question, get_sys_question_by_step
from .views import get_user_all_steps, get_all_user_answers, get_user_step, get_user_full_step
from .views import update_user_step
#from .views get_step, save_step, submit_step

urlpatterns = [
    path('getuserbyusername', get_user_by_username, name='get_user_by_username'),
    path('getuserbyregisterid', get_user_by_register_id, name='get_user_by_register_id'),
    #path('edituser/<int:pk>', edit_user, name='edit_user'),
    #path('getsyssteps', get_sys_step_list, name='get_sys_step_list'),
    path('getsysstep', get_sys_step, name='get_sys_step'),
    #path('getallsysstepquestion', get_all_sys_step_question, name='get_all_sys_step_question'),
    path('getsysstepquestion', get_sys_step_question, name='get_sys_step_question'),
    #path('getallsysquestion', get_all_sys_question, name='get_all_sys_question'),
    path('getsysquestionsbystep', get_sys_question_by_step, name='get_sys_question_by_step'),
    path('getsysquestionoption', get_sys_question_option, name='get_sys_question_option'),
    path('getusersteps', get_user_all_steps, name='get_user_all_steps'),
    path('getuserstep', get_user_step, name='get_user_step'),
    path('getuserfullstep', get_user_full_step, name='get_user_full_step'),
    path('getalluseranswers', get_all_user_answers, name='get_all_user_answers'),
    path('getuseranwersbystep', get_user_step, name='get_user_step'),
    path('updateuserstep', update_user_step, name='update_user_step')
]
