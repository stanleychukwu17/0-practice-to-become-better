# Updating packages

No need to practice this one, just read the code and see what is going on

You can configure the script to run every-time your system is restarted, to do this
go to your terminal and enter:
<pre>
  // note: this will not work in your git-bash terminal
  // it will only work in a pure linux environment, it works on my ubuntu 20.04(WSL)
  -
  crontab -e # -e = editing, i.e we want to edit the cron jobs file
</pre>
once your terminal opens the "crontab" for editing and the full path to the script to the
crontab, use the following format "@reboot bash /path/script.sh" e.g:
<pre>
  @reboot bash /d/Sz - projects/0-practice/devops/bash/4-updating-system-packages/solution-4.sh
</pre>

Now reboot your system to see if this works.
<br>
After rebooting the system, do:
<pre>
  ps -aux | grep -i solution-4.sh
</pre>