Plan
----

Cron jobs in Python.

Plan is easy
````````````

Save in a schedule.py:

.. code:: python

    from plan import Plan

    cron = Plan()

    cron.command('ls /tmp', every='1.day', at='12:00')
    cron.command('pwd', every='2.month')
    cron.command('date', every='weekend')

    if __name__ == "__main__":
        cron.run()

And run it:

.. code:: bash

    $ pip install plan
    $ python schedule.py

Links
`````

* `documentation <http://plan.readthedocs.org/>`_
* `github <https://github.com/fengsp/plan>`_
* `development version
  <http://github.com/fengsp/plan/zipball/master#egg=plan-dev>`_



